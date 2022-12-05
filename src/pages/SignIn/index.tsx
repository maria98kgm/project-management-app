import './style.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Backdrop, Button, CircularProgress, TextField, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Paths } from '../../models';
import { useSignInMutation } from '../../redux/features/api/authApi';
import { showToast } from '../../redux/features/toastSlice';
import { useAppDispatch } from '../../redux/hooks';
import { useState } from 'react';

interface FormInputs {
  login: string;
  password: string;
}

export const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getFieldState,
  } = useForm<FormInputs>({ mode: 'onChange' });

  const [allValid, setAllValid] = useState({
    login: false,
    password: false,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [loginUser, { isLoading }] = useSignInMutation();

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

    return isValid || `${t('INFO.PASSWORD_VALID')}`;
  };

  const onSubmit = async (data: FormInputs): Promise<void> => {
    await loginUser({ login: data.login, password: data.password })
      .unwrap()
      .then(() => navigate(Paths.MAIN))
      .catch((error) => {
        dispatch(showToast({ isOpen: true, severity: 'error', message: error.data.message }));
      });
  };

  return (
    <section className="signIn-content">
      <Box sx={{ bgcolor: 'info.main' }}>
        <form onSubmit={handleSubmit(onSubmit)} className="signIn-form" autoComplete="off">
          <h2>{t('HEADERS.LOG_IN')}</h2>
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
          <Button
            variant="contained"
            type="submit"
            disabled={!allValid.login || !allValid.password}
          >
            {t('BUTTONS.SIGNIN')}
          </Button>
        </form>
      </Box>
      <Backdrop sx={{ color: '#fff' }} open={isLoading}>
        <CircularProgress color="inherit" size={60} />
      </Backdrop>
    </section>
  );
};
