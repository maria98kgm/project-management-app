import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export const BasicModal: React.FC<ModalProps> = ({ isOpen, children }) => {
  const [modalStyle, setModalStyle] = useState(style);

  const handleResize = (): void => {
    if (window.innerWidth < 420) setModalStyle({ ...modalStyle, width: 300 });
    else setModalStyle({ ...modalStyle, width: 400 });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    if (window.innerWidth < 420 && modalStyle.width !== 300)
      setModalStyle({ ...modalStyle, width: 300 });
  }, [modalStyle]);

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...modalStyle, bgcolor: 'info.main', borderColor: 'info.main' }}>
        <div className="modal-content">{children}</div>
      </Box>
    </Modal>
  );
};
