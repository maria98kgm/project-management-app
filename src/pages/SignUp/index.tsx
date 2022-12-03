import './style.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Backdrop, Button, CircularProgress, TextField, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Paths, SignInData, SignUpData } from '../../models';
import { useSignInMutation, useSignUpMutation } from '../../redux/features/api/authApi';
import { showToast } from '../../redux/features/toastSlice';
import { useAppDispatch } from '../../redux/hooks';

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

  const [registerUser, { isLoading }] = useSignUpMutation();
  const [loginUser, { isLoading: loginIsLoading }] = useSignInMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const validatePassword = (password: string): string | boolean => {
    const repeatPasswordState = getFieldState('repeatPassword');

    if (repeatPasswordState.isTouched) {
      trigger('repeatPassword');
    }

    return /^[a-z0-9]*$/i.test(password) || `${t('INFO.PASSWORD_VALID')}`;
  };

  const validateRepeatPassword = (password: string): string | boolean => {
    return password === getValues('password') || `${t('INFO.PASSWORD_MATCH')}`;
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
              minLength: { value: 2, message: `${t('INFO.MESSAGE_MIN')} 2!` },
              maxLength: { value: 20, message: `${t('INFO.MESSAGE_MAX')} 20!` },
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
              minLength: { value: 2, message: `${t('INFO.MESSAGE_MIN')} 2!` },
              maxLength: { value: 20, message: `${t('INFO.MESSAGE_MAX')} 20!` },
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
              minLength: { value: 6, message: `${t('INFO.MESSAGE_MIN')} 6!` },
              maxLength: { value: 20, message: `${t('INFO.MESSAGE_MAX')} 20!` },
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
          <Button variant="contained" type="submit">
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
