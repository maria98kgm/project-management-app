import { Box, TextField, Button, CircularProgress } from '@mui/material';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../../components/ConfirmationModal/ConfirmationModal';
import { Paths, UserData } from '../../models';
import { useDeleteUserMutation, useGetUserMutation } from '../../redux/features/api/userApi';
import { selectUserInfo, setUser } from '../../redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import './style.scss';

type EditProfileProps = {
  onUpdateUserInfo: () => void;
  onDelete: (userId: string) => void;
};
interface FormInputs {
  userName: string;
  login: string;
  password: string;
  repeatPassword: string;
}

export const EditProfile = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [modalState, setModalState] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    getFieldState,
    trigger,
  } = useForm<FormInputs>({ mode: 'onChange' });
  // const [getUsers, { isLoading, isError, error }] = useGetAllUsersMutation();
  // const data = await getAllUsers(args).unwrap();

  const [userData, setUserData] = useState<UserData>({ _id: '', name: '', login: '' });
  const [getUser] = useGetUserMutation();
  const [deleteUserID] = useDeleteUserMutation();
  const userInfo = useAppSelector(selectUserInfo);
  const [mount, setMount] = useState(false);

  const fetchUser = useCallback(async () => {
    const users = (await getUser(userInfo!._id).unwrap()) || '';
    setUserData(users);
  }, [getUser, userInfo]);

  useEffect(() => {
    if (!mount) {
      fetchUser().then(() => setMount(true));
    }
  }, [fetchUser, mount]);

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

  const showDeleteModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setModalState(true);
  };

  const deleteUser = async (_id: string): Promise<void> => {
    await deleteUserID(_id);
    dispatch(setUser(null));
    navigate(Paths.WELCOME);
  };

  return (
    <section className="editProfile-content">
      {!mount ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <div className="editProfile-form">
          <form>
            <h2>User profile</h2>
            <TextField
              {...register('userName', {
                required: 'This field is required!',
                minLength: { value: 2, message: 'Min length is 2!' },
                maxLength: { value: 20, message: 'Max length is 20!' },
              })}
              label="Change your name"
              defaultValue={userData.name}
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
              defaultValue={userData.login}
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
              label="Change your password:"
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
              Save changes
            </Button>
          </form>
          <Button
            variant="contained"
            type="submit"
            className="delete-user"
            onClick={(event) => showDeleteModal(event)}
          >
            Delete account
          </Button>
          <ConfirmationModal
            modalState={modalState}
            applyYes={() => deleteUser(userData._id)}
            applyNo={() => setModalState(false)}
          />
        </div>
      )}
    </section>
  );
};
