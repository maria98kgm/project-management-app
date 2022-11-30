import './style.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Paths } from '../../models';
import { useSignInMutation } from '../../redux/features/api/authApi';
import { showToast } from '../../redux/features/toastSlice';
import { useAppDispatch } from '../../redux/hooks';

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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [loginUser, { isLoading }] = useSignInMutation();

  const validatePassword = (password: string): string | boolean => {
    return /^[a-z0-9]*$/i.test(password) || `${t('INFO.PASSWORD_VALID')}`;
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
      <form onSubmit={handleSubmit(onSubmit)} className="signIn-form">
        <h2>{t('HEADERS.LOG_IN')}</h2>
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
        <Button variant="contained" type="submit">
          {t('BUTTONS.SIGNIN')}
        </Button>
      </form>
      <Backdrop sx={{ color: '#fff' }} open={isLoading}>
        <CircularProgress color="inherit" size={60} />
      </Backdrop>
    </section>
  );
};
