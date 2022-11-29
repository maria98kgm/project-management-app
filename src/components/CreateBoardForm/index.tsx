import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { useGetAllUsersMutation } from '../../redux/features/api/userApi';
import { useCreateBoardMutation } from '../../redux/features/api/boardApi';
import { showToast } from '../../redux/features/toastSlice';
import { useTypedDispatch } from '../../redux/store';
import { BoardData, NewBoardData } from '../../models';
import './style.scss';

type CreateBoardFormProps = {
  onCreateBoard: () => void;
  handleClose: () => void;
};

type UserName = {
  id: string;
  name: string;
};

export const CreateBoardForm: React.FC<CreateBoardFormProps> = ({ onCreateBoard, handleClose }) => {
  const [names, setNames] = useState<UserName[]>([]);
  const [mount, setMount] = useState(false);
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const [getUsers] = useGetAllUsersMutation();
  const [createBoard] = useCreateBoardMutation();
  const user = useAppSelector((state: RootState) => state.user);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getFieldState,
  } = useForm<Partial<BoardData>>({ mode: 'onChange' });

  const fetchUsers = useCallback(async () => {
    await getUsers(null)
      .unwrap()
      .then((users) => {
        const nextNames: UserName[] = [];
        users.forEach((user) => {
          nextNames.push({
            id: user._id,
            name: user.name,
          });
        });

        setNames(nextNames);
      })
      .catch((err) => {
        if (err.status === 403) handleClose();
      });
  }, [getUsers, handleClose]);

  useEffect(() => {
    if (!mount) {
      setMount(true);
      fetchUsers();
    }
  }, [fetchUsers, mount]);

  const onSubmit = async (data: Partial<BoardData>): Promise<void> => {
    const userIds: string[] = names
      .filter((user) => data.users!.includes(user.name))
      .map((user) => user.id);

    const newBoard: NewBoardData = {
      title: data.title ? data.title : '',
      users: userIds ? userIds : [],
      owner: user.userInfo && user.userInfo._id ? user.userInfo._id : '',
    };

    await createBoard(newBoard);
    dispatch(
      showToast({
        isOpen: true,
        severity: 'success',
        message: `${t('INFO.APPLIED')}`,
      })
    );
    onCreateBoard();
  };

  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>): void => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-board">
      <h2>{t('BUTTONS.ADD_BOARD')}</h2>
      <TextField
        {...register('title', {
          required: 'This field is required!',
          minLength: { value: 2, message: 'Min length is 2!' },
        })}
        label={t('HEADERS.TITLE')}
        variant="standard"
        error={!!getFieldState('title').error}
        helperText={errors['title']?.message}
        autoComplete="title"
        required
        fullWidth
      />
      <FormControl variant="standard" sx={{ m: 1 }}>
        <InputLabel variant="standard" htmlFor="select-users">
          {t('HEADERS.USERS')}
        </InputLabel>
        <Select
          {...register('users')}
          labelId="select-users"
          id="select-filled"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label={t('HEADERS.USERS')} />}
          renderValue={(selected: string[]) => selected.join(', ')}
        >
          {names.map((user, idx) => (
            <MenuItem key={`${user.name}-${idx}`} value={user.name}>
              <Checkbox checked={personName.indexOf(user.name) > -1} />
              <ListItemText primary={user.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="buttons">
        <Button variant="contained" type="submit">
          {t('BUTTONS.CREATE')}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(
              showToast({ isOpen: true, severity: 'warning', message: `${t('INFO.CANCELLED')}` })
            );
            handleClose();
          }}
        >
          {t('BUTTONS.CANCEL')}
        </Button>
      </div>
    </form>
  );
};
