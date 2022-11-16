import './style.scss';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthData, Paths } from '../../models';
import { setCookie } from '../../share/setCookie';
import { URL_BASE } from '../../constants';

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

  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const repeatPasswordState = getFieldState('repeatPassword');

    if (repeatPasswordState.isTouched) {
      trigger('repeatPassword');
    }

    return /^[a-z0-9]*$/i.test(password) || 'The password should contain only numbers and letters!';
  };

  const validateRepeatPassword = (password: string) => {
    return password === getValues('password') || 'Password is not the same!';
  };

  const onSubmit = (data: FormInputs) => {
    signUp(data)
      .then((res: { login: string }) => logIn(res.login, data.password))
      .then((res: { token: string }) => {
        setCookie(res.token);
        navigate(Paths.MAIN);
      })
      .catch((err: Error) => console.error(err.message || err));
  };

  const signUp = async (data: FormInputs) => {
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

  const logIn = async (login: string, password: string) => {
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
        <label className="signUp-field-container">
          <input
            type="text"
            {...register('userName', {
              required: 'This field is required!',
              minLength: { value: 2, message: 'Min length is 2!' },
              maxLength: { value: 20, message: 'Max length is 20!' },
            })}
            autoComplete="nickname"
            placeholder="Name*"
            className="signUp-field"
          />
          <ErrorMessage
            errors={errors}
            name="userName"
            render={({ message }) => <p className="errorMessage">{message}</p>}
          />
        </label>
        <label className="signUp-field-container">
          <input
            type="text"
            {...register('login', {
              required: 'This field is required!',
              minLength: { value: 2, message: 'Min length is 2!' },
              maxLength: { value: 20, message: 'Max length is 20!' },
            })}
            autoComplete="username"
            placeholder="Login*"
            className="signUp-field"
          />
          <ErrorMessage
            errors={errors}
            name="login"
            render={({ message }) => <p className="errorMessage">{message}</p>}
          />
        </label>
        <label className="signUp-field-container">
          <input
            type="password"
            {...register('password', {
              required: 'This field is required!',
              minLength: { value: 6, message: 'Min length is 6!' },
              maxLength: { value: 20, message: 'Max length is 20!' },
              validate: validatePassword,
            })}
            autoComplete="new-password"
            placeholder="Password*"
            className="signUp-field"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className="errorMessage">{message}</p>}
          />
        </label>
        <label className="signUp-field-container">
          <input
            type="password"
            {...register('repeatPassword', {
              required: 'This field is required!',
              validate: validateRepeatPassword,
            })}
            autoComplete="new-password"
            placeholder="Repeat Password*"
            className="signUp-field"
          />
          <ErrorMessage
            errors={errors}
            name="repeatPassword"
            render={({ message }) => <p className="errorMessage">{message}</p>}
          />
        </label>
        <button type="submit" className="signUp-button">
          Sign Up
        </button>
      </form>
    </section>
  );
};
