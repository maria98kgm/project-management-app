import './style.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { AuthData, Paths } from '../../models';
import { setCookie } from '../../share/setCookie';
import { URL_BASE } from '../../constants';

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

  const validatePassword = (password: string): string | boolean => {
    return /^[a-z0-9]*$/i.test(password) || 'The password should contain only numbers and letters!';
  };

  const onSubmit = (data: FormInputs): void => {
    signUp(data)
      .then((res: { login: string }) => logIn(res.login, data.password))
      .then((res: { token: string }) => {
        setCookie(res.token);
        navigate(Paths.MAIN);
      })
      .catch((err: Error) => console.error(err.message || err));
  };

  const signUp = async (data: FormInputs): Promise<{ login: string }> => {
    const postData: AuthData = {
      login: data.login,
      password: data.password,
    };
    const res = await fetch(`${URL_BASE}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    return res.json();
  };

  const logIn = async (login: string, password: string): Promise<{ token: string }> => {
    const postData: AuthData = {
      login: login,
      password: password,
    };
    const res = await fetch(`${URL_BASE}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    return res.json();
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
