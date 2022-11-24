import { useTranslation } from 'react-i18next';
import { BasicModal } from '../Modal/Modal';
import { Button } from '@mui/material';
import './style.scss';

type ModalProps = {
  modalState: boolean;
  applyYes: () => void;
  applyNo: () => void;
};

export const ConfirmationModal: React.FC<ModalProps> = ({ modalState, applyYes, applyNo }) => {
  const { t } = useTranslation();

  return (
    <BasicModal isOpen={modalState}>
      <h3>{t('INFO.CONFIRMATION')}</h3>
      <div className="modal-buttons">
        <Button
          variant="contained"
          onClick={(event) => {
            event.stopPropagation();
            applyYes();
          }}
        >
          {t('BUTTONS.YES')}
        </Button>
        <Button
          variant="contained"
          onClick={(event) => {
            event.stopPropagation();
            applyNo();
          }}
        >
          {t('BUTTONS.NO')}
        </Button>
      </div>
    </BasicModal>
  );
};
