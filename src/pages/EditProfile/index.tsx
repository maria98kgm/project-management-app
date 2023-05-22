import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  useDeleteUserMutation,
  useGetUserMutation,
  useUpdateUserMutation,
} from '../../redux/features/api/userApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUserInfo, setUser } from '../../redux/features/userSlice';
import { showToast } from '../../redux/features/toastSlice';
import { Box, TextField, Button, CircularProgress, Backdrop } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ConfirmationModal } from '../../components/ConfirmationModal/ConfirmationModal';
import { Paths, UserData } from '../../models';

import './style.scss';
import { deleteCookieToken } from '../../share/cookieToken';

interface FormInputs {
  userName: string;
  login: string;
  password: string;
  repeatPassword: string;
}

export const EditProfile = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [modalState, setModalState] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    getFieldState,
    trigger,
  } = useForm<FormInputs>({ mode: 'onChange' });

  const [userData, setUserData] = useState<UserData>({ _id: '', name: '', login: '' });
  const [getUser] = useGetUserMutation();
  const [updateUserData, { isLoading: updateUserLoading }] = useUpdateUserMutation();
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

    return /^[a-z0-9]*$/i.test(password) || `${t('INFO.PASSWORD_VALID')}`;
  };

  const validateRepeatPassword = (password: string): string | boolean => {
    return password === getValues('password') || `${t('INFO.PASSWORD_MATCH')}`;
  };

  const showDeleteModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setModalState(true);
  };

  const deleteUser = async (_id: string): Promise<void> => {
    await deleteUserID(_id);
    dispatch(setUser(null));
    deleteCookieToken();
    navigate(Paths.WELCOME);
    dispatch(
      showToast({
        isOpen: true,
        severity: 'success',
        message: `${t('INFO.MESSAGE_DELETE')}`,
      })
    );
  };

  const onEditUserSubmit = async (data: FormInputs): Promise<void> => {
    const editData = {
      userId: userInfo!._id,
      userInfo: {
        name: data.userName,
        login: data.login,
        password: data.password,
      },
    };
    await updateUserData(editData);
    dispatch(
      showToast({
        isOpen: true,
        severity: 'success',
        message: `${t('INFO.APPLIED')}`,
      })
    );
  };

  return (
    <section className="editProfile-content">
      {!mount ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ bgcolor: 'info.main' }}>
          <div className="editProfile">
            <form className="editProfile-form" onSubmit={handleSubmit(onEditUserSubmit)}>
              <h2>{t('HEADERS.USER_PROFILE')}</h2>
              <TextField
                {...register('userName', {
                  required: `${t('INFO.REQUIRED_TEXT')}`,
                  minLength: { value: 2, message: `${t('INFO.MESSAGE_MIN')} 2!` },
                  maxLength: { value: 20, message: `${t('INFO.MESSAGE_MAX')} 20!` },
                })}
                label={t('FIELDS.CHANGE_NAME')}
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
                  required: `${t('INFO.REQUIRED_TEXT')}`,
                  minLength: { value: 2, message: `${t('INFO.MESSAGE_MIN')} 2!` },
                  maxLength: { value: 20, message: `${t('INFO.MESSAGE_MAX')} 20!` },
                })}
                label={t('FIELDS.CHANGE_LOGIN')}
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
                  required: `${t('INFO.REQUIRED_TEXT')}`,
                  minLength: { value: 6, message: `${t('INFO.MESSAGE_MIN')} 6!` },
                  maxLength: { value: 20, message: `${t('INFO.MESSAGE_MAX')} 20!` },
                  validate: validatePassword,
                })}
                label={t('FIELDS.CHANGE_PASSWORD')}
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
                  required: `${t('INFO.REQUIRED_TEXT')}`,
                  validate: validateRepeatPassword,
                })}
                label={t('FIELDS.REPEAT_PASSWORD')}
                variant="standard"
                error={!!getFieldState('repeatPassword').error}
                helperText={errors['repeatPassword']?.message}
                type="password"
                autoComplete="new-password"
                required
                fullWidth
              />
              <Button variant="contained" type="submit">
                {t('BUTTONS.SAVE_CHANGES')}
              </Button>
            </form>
            <Button
              variant="contained"
              type="submit"
              className="delete-user"
              onClick={(event) => showDeleteModal(event)}
            >
              {t('BUTTONS.DELETE')}
            </Button>
            <ConfirmationModal
              modalState={modalState}
              applyYes={() => deleteUser(userData._id)}
              applyNo={() => setModalState(false)}
            />
          </div>
          <Backdrop sx={{ color: '#fff' }} open={updateUserLoading}>
            <CircularProgress color="inherit" size={60} />
          </Backdrop>
        </Box>
      )}
    </section>
  );
};
