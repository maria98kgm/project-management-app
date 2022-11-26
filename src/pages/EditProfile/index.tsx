import { Container, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ConfirmationModal } from '../../components/ConfirmationModal/ConfirmationModal';

import './style.scss';

interface FormInputs {
  userName: string;
  login: string;
  password: string;
  repeatPassword: string;
}

export const EditProfile: React.FC = () => {
  const {
    register,
    getFieldState,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onChange' });

  return (
    <section className="signUp-content">
      <form className="signUp-form">
        <h2>User profile</h2>
        <TextField
          {...register('userName', {
            required: 'This field is required!',
            minLength: { value: 2, message: 'Min length is 2!' },
            maxLength: { value: 20, message: 'Max length is 20!' },
          })}
          label="Change your name"
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
          label="Change your login:"
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
          })}
          label="Change your password:"
          variant="standard"
          error={!!getFieldState('password').error}
          helperText={errors['password']?.message}
          type="password"
          autoComplete="new-password"
          required
          fullWidth
        />
        <Button variant="contained" type="submit" disabled>
          Save changes
        </Button>
        <Button variant="contained" type="submit" className="delete-user">
          Delete account
        </Button>
      </form>
    </section>
  );
};
