import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { useCreateTaskMutation } from '../../redux/features/api/taskApi';
import { showToast } from '../../redux/features/toastSlice';
import { useTypedDispatch } from '../../redux/store';
import { TaskData, TaskCreateData } from '../../models';
import './style.scss';

type CreateTaskFormProps = {
  taskOrder: number;
  boardId: string;
  columnId: string;
  handleClose: () => void;
};

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  handleClose,
  taskOrder,
  boardId,
  columnId,
}) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const user = useAppSelector((state: RootState) => state.user.userInfo);
  const names = useAppSelector((state: RootState) => state.user.allUsers);
  const [personName, setPersonName] = useState<string[]>([]);
  const [createTask] = useCreateTaskMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getFieldState,
  } = useForm<Partial<TaskData>>({ mode: 'onChange' });

  const onSubmit = async (data: Partial<TaskData>): Promise<void> => {
    const userIds: string[] = names
      .filter((user) => data.users!.includes(user.name))
      .map((user) => user.id);

    const taskInfo: TaskCreateData = {
      title: data.title || '',
      order: taskOrder,
      description: data.description || '',
      userId: user?._id || '',
      users: userIds,
    };

    await createTask({ boardId, columnId, taskInfo });

    dispatch(
      showToast({
        isOpen: true,
        severity: 'success',
        message: `${t('INFO.APPLIED')}`,
      })
    );

    handleClose();
  };

  const handleChange = (event: SelectChangeEvent<typeof personName>): void => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-task">
      <h2>{t('BUTTONS.ADD_TASK')}</h2>
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
      <TextField
        {...register('description', {
          required: 'This field is required!',
          minLength: { value: 2, message: 'Min length is 2!' },
        })}
        variant="standard"
        label={t('HEADERS.DESCRIPTION')}
        error={!!getFieldState('description').error}
        helperText={errors['description']?.message}
        rows={4}
        required
        fullWidth
        multiline
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
