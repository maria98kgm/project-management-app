import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { ConfirmationModal } from '../../components/ConfirmationModal/ConfirmationModal';
import { Paths, UserData } from '../../models';
import { useGetAllUsersMutation, useGetUserMutation } from '../../redux/features/api/userApi';
import { selectUserInfo } from '../../redux/features/userSlice';
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
  const [isDisabledInputs, setDisabledInputs] = useState<boolean>(true);
  const {
    register,
    getFieldState,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onChange' });
  // const [getUsers, { isLoading, isError, error }] = useGetAllUsersMutation();
  // const data = await getAllUsers(args).unwrap();

  const [userData, setUserData] = useState<UserData>({ _id: '', name: '', login: '' });
  const [getUser] = useGetUserMutation();
  const userInfo = useAppSelector(selectUserInfo);
  const [mount, setMount] = useState(false);

  const fetchUser = useCallback(async () => {
    const users = (await getUser(userInfo!._id).unwrap()) || '';
    setUserData(users);
  }, [getUser, userInfo]);

  useEffect(() => {
    if (!mount) {
      fetchUser().then(() => setMount(true));
      // fetchUsers();
    }
  }, [fetchUser, mount]);
  console.log(userData);

  const showDeleteModal = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setModalState(true);
  };

  // const deleteUser = () => {
  //   setModalState(false);
  //   if (column._id) onDelete(column._id);
  //   Navigate(Paths.WELCOME);
  // };

  return (
    <section className="signUp-content">
      {!mount ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <form className="signUp-form">
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
          <Button
            variant="contained"
            type="submit"
            className="delete-user"
            // onClick={(event) => showDeleteModal(event)}
          >
            Delete account
          </Button>
          {/* <ConfirmationModal
          modalState={modalState}
          // applyYes={() => deleteUser()}
          applyNo={() => setModalState(false)} */}
          {/* /> */}
        </form>
      )}
    </section>
  );
};
