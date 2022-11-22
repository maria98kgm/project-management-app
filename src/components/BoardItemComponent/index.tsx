import { useTranslation } from 'react-i18next';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import LoupeIcon from '@mui/icons-material/Loupe';
import './style.scss';

type BoardItemProp = {
  title: string;
  users: string[];
};

export const BoardItem: React.FC<BoardItemProp> = ({ title, users }) => {
  const { t } = useTranslation();

  return (
    <div className="boardItem">
      <div className="boardItem-top">
        <h2 className="boardItem-title">{title}</h2>
        <div className="boardItem-tools">
          <BorderColorIcon color="info" />
          <DeleteIcon color="info" />
        </div>
      </div>
      <div className="boardItem-bottom">
        <div className="boardItem-description">
          <h3>{t('HEADERS.USERS')}:</h3>
          <p>{users.join(', ')}</p>
        </div>
        <p className="boardItem-columns-tasks">Columns: 4, Tasks: 10</p>
      </div>
      <div className="boardItem-loupe">
        <LoupeIcon color="primary" />
      </div>
    </div>
  );
};
