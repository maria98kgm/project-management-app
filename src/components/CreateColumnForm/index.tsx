import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';
import { useCreateColumnMutation } from '../../redux/features/api/columnApi';
import { showToast } from '../../redux/features/toastSlice';
import { useTypedDispatch } from '../../redux/store';
import { ColumnData, NewColumnData } from '../../models';
import './style.scss';

type CreateColumnFormProps = {
  columnOrder: number;
  boardId: string;
  handleClose: () => void;
};

export const CreateColumnForm: React.FC<CreateColumnFormProps> = ({
  columnOrder,
  boardId,
  handleClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const [createColumn] = useCreateColumnMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getFieldState,
  } = useForm<Partial<ColumnData>>({ mode: 'onChange' });

  const onSubmit = async (data: Partial<ColumnData>): Promise<void> => {
    const columnInfo: NewColumnData = {
      title: data.title ? data.title : '',
      order: columnOrder,
    };

    await createColumn({ boardId, columnInfo });
    dispatch(
      showToast({
        isOpen: true,
        severity: 'success',
        message: `${t('INFO.APPLIED')}`,
      })
    );
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-column">
      <h2>{t('BUTTONS.ADD_COLUMN')}</h2>
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
