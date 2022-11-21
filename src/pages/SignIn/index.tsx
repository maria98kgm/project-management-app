import './style.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { Paths } from '../../models';
import { setCookieToken } from '../../share/cookieToken';
import { useSignInMutation } from '../../redux/features/api/authApi';

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

  const [loginUser] = useSignInMutation();

  const validatePassword = (password: string): string | boolean => {
    return /^[a-z0-9]*$/i.test(password) || 'The password should contain only numbers and letters!';
  };

  const onSubmit = async (data: FormInputs): Promise<void> => {
    const token = await loginUser({ login: data.login, password: data.password }).unwrap();

    setCookieToken(token);
    navigate(Paths.MAIN);
  };

  return (
    <section className="signIn-content">
      <form onSubmit={handleSubmit(onSubmit)} className="signIn-form">
        <h2>Sign in</h2>
        <TextField
          {...register('login', {
            required: 'This field is required!',
            minLength: { value: 2, message: 'Min length is 2!' },
            maxLength: { value: 20, message: 'Max length is 20!' },
          })}
          label="Login"
          variant="standard"
          error={!!getFieldState('login').error}
          helperText={errors['login']?.message}
          autoComplete="username"
          required
          fullWidth
        />
        <TextField
          {...register('password', {
            required: 'This field is required!',
            minLength: { value: 6, message: 'Min length is 6!' },
            maxLength: { value: 20, message: 'Max length is 20!' },
            validate: validatePassword,
          })}
          label="Password"
          variant="standard"
          error={!!getFieldState('password').error}
          helperText={errors['password']?.message}
          type="password"
          autoComplete="new-password"
          required
          fullWidth
        />
        <Button variant="contained" type="submit">
          Sign In
        </Button>
      </form>
    </section>
  );
};
