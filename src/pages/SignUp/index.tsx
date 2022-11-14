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
  } = useForm<FormInputs>({ mode: 'onChange' });

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  const validateRepeatPassword = (password: string) => {
    return password === getValues('password') || 'Password is not the same!';
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
            pattern: {
              value: /^[a-z0-9]*$/i,
              message: 'The password should contain only numbers and letters!',
            },
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
