import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import { useDeleteBoardMutation } from '../../redux/features/api/boardApi';
import './style.scss';

type BoardItemProp = {
  boardId: string;
  title: string;
  users: string[];
};

export const BoardItem: React.FC<BoardItemProp> = ({ boardId, title, users }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [deleteBoardById] = useDeleteBoardMutation();
  const [modalState, setModalState] = useState(false);

  const showDeleteModal = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setModalState(true);
  };

  const deleteBoard = async (id: string) => {
    setModalState(false);
    await deleteBoardById(id);
  };

  return (
    <div className="boardItem" onClick={() => navigate(`/board/${boardId}`)}>
      <div className="boardItem-top">
        <h2 className="boardItem-title">{title}</h2>
        <div className="boardItem-tools">
          <DeleteIcon color="info" onClick={(event) => showDeleteModal(event)} />
        </div>
      </div>
      <div className="boardItem-bottom">
        <div className="boardItem-description">
          <h3>{t('HEADERS.USERS')}:</h3>
          <p>{users.join(', ')}</p>
        </div>
        <p className="boardItem-columns-tasks">Columns: 4, Tasks: 10</p>
      </div>
      <ConfirmationModal
        modalState={modalState}
        applyYes={() => deleteBoard(boardId)}
        applyNo={() => setModalState(false)}
      />
    </div>
  );
};
