import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import LoupeIcon from '@mui/icons-material/Loupe';
import './style.scss';

type BoardItemProp = {
  boardId: string;
  title: string;
  users: string[];
};

export const BoardItem: React.FC<BoardItemProp> = ({ boardId, title, users }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="boardItem" onClick={() => navigate(`/board/${boardId}`)}>
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
