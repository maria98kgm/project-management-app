import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import './style.scss';

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

  const onSubmit = (data: FormInputs) => {
    signUp(data)
      .then((res) => res)
      .then((res: { login: string }) => logIn(res.login, data.password))
      .then((res) => {
        document.cookie = `Bearer=${res.token}`;
      });
  };

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

  const signUp = async (data: FormInputs) => {
    const reqData = {
      name: data.userName,
      login: data.login,
      password: data.password,
    };
    const res = await fetch(
      'https://final-task-backend-production-b68c.up.railway.app/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      }
    );

    return res.json();
  };

  const logIn = async (login: string, password: string) => {
    const reqData = {
      login: login,
      password: password,
    };
    const res = await fetch(
      'https://final-task-backend-production-b68c.up.railway.app/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      }
    );

    return res.json();
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <input
          type="text"
          {...register('userName', {
            required: 'This field is required!',
            minLength: { value: 2, message: 'Min length is 2!' },
          })}
          autoComplete="nickname"
          placeholder="Name"
        />
        <ErrorMessage errors={errors} name="userName" render={({ message }) => <p>{message}</p>} />
        <input
          type="text"
          {...register('login', {
            required: 'This field is required!',
            minLength: { value: 2, message: 'Min length is 2!' },
          })}
          autoComplete="username"
          placeholder="Login"
        />
        <ErrorMessage errors={errors} name="login" render={({ message }) => <p>{message}</p>} />
        <input
          type="password"
          {...register('password', {
            required: 'This field is required!',
            minLength: { value: 6, message: 'Min length is 6!' },
            validate: validatePassword,
          })}
          autoComplete="new-password"
          placeholder="Password"
        />
        <ErrorMessage errors={errors} name="password" render={({ message }) => <p>{message}</p>} />
        <input
          type="password"
          {...register('repeatPassword', {
            required: 'This field is required!',
            validate: validateRepeatPassword,
          })}
          autoComplete="new-password"
          placeholder="Repeat Password"
        />
        <ErrorMessage
          errors={errors}
          name="repeatPassword"
          render={({ message }) => <p>{message}</p>}
        />
        <input type="submit" />
      </form>
    </section>
  );
};
