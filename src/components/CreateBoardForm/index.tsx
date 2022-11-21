import { useEffect, useState } from 'react';
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
import { useGetAllUsersMutation } from '../../redux/features/api/userApi';
import { Board } from '../../models';
import './style.scss';

type CreateBoardFormProps = {
  handleClose: () => void;
};

export const CreateBoardForm: React.FC<CreateBoardFormProps> = ({ handleClose }) => {
  const [names, setNames] = useState<string[]>([]);
  const { t } = useTranslation();
  const [getUsers] = useGetAllUsersMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getFieldState,
  } = useForm<Partial<Board>>({ mode: 'onChange' });

  useEffect(() => {
    async function fetchUsers() {
      const users = await getUsers(null).unwrap();

      const nextNames: string[] = [];
      users.forEach((user) => {
        nextNames.push(user.name);
      });

      setNames(nextNames);
    }

    fetchUsers();
  }, [getUsers, names]);

  const onSubmit = async (data: Partial<Board>): Promise<void> => {
    console.log(data);
  };

  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
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
          {names.map((name, idx) => (
            <MenuItem key={`${name}-${idx}`} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="buttons">
        <Button variant="contained" type="submit">
          {t('BUTTONS.CREATE')}
        </Button>
        <Button variant="contained" onClick={() => handleClose()}>
          {t('BUTTONS.CANCEL')}
        </Button>
      </div>
    </form>
  );
};
