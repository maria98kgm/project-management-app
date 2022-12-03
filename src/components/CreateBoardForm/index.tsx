import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
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

export const CreateBoardForm: React.FC<CreateBoardFormProps> = ({ onCreateBoard, handleClose }) => {
  const [mount, setMount] = useState(false);
  const [personName, setPersonName] = useState<string[]>([]);
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const [getUsers] = useGetAllUsersMutation();
  const [createBoard] = useCreateBoardMutation();
  const user = useAppSelector((state: RootState) => state.user.userInfo);
  const names = useAppSelector((state: RootState) => state.user.allUsers);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getFieldState,
  } = useForm<Partial<BoardData>>({ mode: 'onChange' });

  const fetchUsers = useCallback(async () => {
    await getUsers(null).unwrap();
  }, [getUsers]);

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
      title: data.title || '',
      users: userIds || [],
      owner: user && user._id ? user._id : '',
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
          {names.map((name, idx) => {
            if (name.id === user?._id) return null;
            return (
              <MenuItem key={`${name.name}-${idx}`} value={name.name}>
                <Checkbox checked={personName.indexOf(name.name) > -1} />
                <ListItemText primary={name.name} />
              </MenuItem>
            );
          })}
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
