import './style.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { AuthData, Paths } from '../../models';
import { setCookie } from '../../share/setCookie';
import { URL_BASE } from '../../constants';
import { useLoginUserMutation, useRegisterUserMutation } from '../../redux/features/api/authApi';

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

  // const [registerUser, { isLoading, isSuccess, error, isError }] = useRegisterUserMutation();
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();

  const validatePassword = (password: string): string | boolean => {
    const repeatPasswordState = getFieldState('repeatPassword');

    if (repeatPasswordState.isTouched) {
      trigger('repeatPassword');
    }

    return /^[a-z0-9]*$/i.test(password) || 'The password should contain only numbers and letters!';
  };

  const validateRepeatPassword = (password: string): string | boolean => {
    return password === getValues('password') || 'Password is not the same!';
  };

  const onSubmit = (data: FormInputs): void => {
    // const postData: AuthData = {
    //   name: data.userName,
    //   login: data.login,
    //   password: data.password,
    // };
    // registerUser(postData);
    signUp(data)
      .then((res: { login: string }) => loginUser({ login: res.login, password: data.password }))
      // .then((res: { token: string }) => {
      //   setCookie(res.token);
      //   navigate(Paths.MAIN);
      // })
      .catch((err: Error) => console.error(err.message || err));
  };

  const signUp = async (data: FormInputs): Promise<{ login: string }> => {
    const postData: AuthData = {
      name: data.userName,
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
    <section className="signUp-content">
      <form onSubmit={handleSubmit(onSubmit)} className="signUp-form">
        <h2>Create an account</h2>
        <TextField
          {...register('userName', {
            required: 'This field is required!',
            minLength: { value: 2, message: 'Min length is 2!' },
            maxLength: { value: 20, message: 'Max length is 20!' },
          })}
          label="Name"
          variant="standard"
          error={!!getFieldState('userName').error}
          helperText={errors['userName']?.message}
          autoComplete="nickname"
          required
          fullWidth
        />
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
        <TextField
          {...register('repeatPassword', {
            required: 'This field is required!',
            validate: validateRepeatPassword,
          })}
          label="Repeat Password"
          variant="standard"
          error={!!getFieldState('repeatPassword').error}
          helperText={errors['repeatPassword']?.message}
          type="password"
          autoComplete="new-password"
          required
          fullWidth
        />
        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </form>
    </section>
  );
};
