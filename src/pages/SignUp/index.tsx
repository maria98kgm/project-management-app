import './style.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Backdrop, Button, CircularProgress, TextField, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Paths, SignInData, SignUpData } from '../../models';
import { useSignInMutation, useSignUpMutation } from '../../redux/features/api/authApi';
import { showToast } from '../../redux/features/toastSlice';
import { useAppDispatch } from '../../redux/hooks';
import { useState } from 'react';

interface FormInputs {
  userName: string;
  login: string;
  password: string;
  repeatPassword: string;
}

export const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    getFieldState,
    trigger,
  } = useForm<FormInputs>({ mode: 'onChange' });

  const [allValid, setAllValid] = useState({
    userName: false,
    login: false,
    password: false,
    repeatPassword: false,
  });

  const [registerUser, { isLoading }] = useSignUpMutation();
  const [loginUser, { isLoading: loginIsLoading }] = useSignInMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const validateName = (val: string): string | boolean => {
    if (val.length < 2) {
      setAllValid({ ...allValid, userName: false });
      return `${t('INFO.MESSAGE_MIN')} 2!`;
    }
    if (val.length > 20) {
      setAllValid({ ...allValid, userName: false });
      return `${t('INFO.MESSAGE_MAX')} 20!`;
    }

    setAllValid({ ...allValid, userName: true });
    return true;
  };

  const validateLogin = (val: string): string | boolean => {
    if (/\s/.test(val)) {
      setAllValid({ ...allValid, login: false });
      return `${t('INFO.WITHOUT_WHITESPACES')}`;
    }
    if (val.length < 2) {
      setAllValid({ ...allValid, login: false });
      return `${t('INFO.MESSAGE_MIN')} 2!`;
    }
    if (val.length > 20) {
      setAllValid({ ...allValid, login: false });
      return `${t('INFO.MESSAGE_MAX')} 20!`;
    }

    setAllValid({ ...allValid, login: true });
    return true;
  };

  const validatePassword = (password: string): string | boolean => {
    const repeatPasswordState = getFieldState('repeatPassword');

    if (password.length < 6) {
      setAllValid({ ...allValid, password: false });
      return `${t('INFO.MESSAGE_MIN')} 6!`;
    }
    if (password.length > 20) {
      setAllValid({ ...allValid, password: false });
      return `${t('INFO.MESSAGE_MAX')} 20!`;
    }

    const isValid = /^[a-z0-9]*$/i.test(password);
    setAllValid({ ...allValid, password: isValid });

    if (repeatPasswordState.isTouched) {
      trigger('repeatPassword');

      const isRepeatValid = getValues('repeatPassword') === password;
      setAllValid({ ...allValid, password: isValid, repeatPassword: isRepeatValid });
    }

    return isValid || `${t('INFO.PASSWORD_VALID')}`;
  };

  const validateRepeatPassword = (password: string): string | boolean => {
    const isValid = password === getValues('password');
    setAllValid({ ...allValid, repeatPassword: isValid });

    return isValid || `${t('INFO.PASSWORD_MATCH')}`;
  };

  const onSubmit = async (data: FormInputs): Promise<void> => {
    const regData: SignUpData = {
      name: data.userName,
      login: data.login,
      password: data.password,
    };
    const loginData: SignInData = {
      login: data.login,
      password: data.password,
    };

    await registerUser(regData)
      .unwrap()
      .then(() => {
        loginUser(loginData).then(() => navigate(Paths.MAIN));
      })
      .catch((error) => {
        dispatch(showToast({ isOpen: true, severity: 'error', message: error.data.message }));
      });
  };

  return (
    <section className="signUp-content">
      <Box sx={{ bgcolor: 'info.main' }}>
        <form onSubmit={handleSubmit(onSubmit)} className="signUp-form">
          <h2>{t('HEADERS.REGISTER')}</h2>
          <TextField
            {...register('userName', {
              required: `${t('INFO.REQUIRED_TEXT')}`,
              validate: validateName,
            })}
            label={t('FIELDS.NAME')}
            variant="standard"
            error={!!getFieldState('userName').error}
            helperText={errors['userName']?.message}
            autoComplete="nickname"
            required
            fullWidth
          />
          <TextField
            {...register('login', {
              required: `${t('INFO.REQUIRED_TEXT')}`,
              validate: validateLogin,
            })}
            label={t('FIELDS.LOGIN')}
            variant="standard"
            error={!!getFieldState('login').error}
            helperText={errors['login']?.message}
            autoComplete="username"
            required
            fullWidth
          />
          <TextField
            {...register('password', {
              required: `${t('INFO.REQUIRED_TEXT')}`,
              validate: validatePassword,
            })}
            label={t('FIELDS.PASSWORD')}
            variant="standard"
            error={!!getFieldState('password').error}
            helperText={errors['password']?.message}
            type="password"
            autoComplete="new-password"
            required
            fullWidth
          />
          <TextField
            {...register('repeatPassword', {
              required: `${t('INFO.REQUIRED_TEXT')}`,
              validate: validateRepeatPassword,
            })}
            label={t('FIELDS.REPEAT_PASSWORD')}
            variant="standard"
            error={!!getFieldState('repeatPassword').error}
            helperText={errors['repeatPassword']?.message}
            type="password"
            autoComplete="new-password"
            required
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            disabled={
              !allValid.userName ||
              !allValid.login ||
              !allValid.password ||
              !allValid.repeatPassword
            }
          >
            {t('BUTTONS.SIGNUP')}
          </Button>
        </form>
      </Box>
      <Backdrop sx={{ color: '#fff' }} open={isLoading || loginIsLoading}>
        <CircularProgress color="inherit" size={60} />
      </Backdrop>
    </section>
  );
};
