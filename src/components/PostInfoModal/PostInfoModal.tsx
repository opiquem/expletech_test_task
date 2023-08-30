import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './PostInfo.module.scss';
import { Post } from '../../types/Post';
import { useAppSelector } from '../../app/hooks';
import { CommentCard } from '../CommentCard/CommentCard';

type Props = {
  isModalOpen: boolean,
  handleClose: () => void,
  post: Omit<Post, 'userId'>,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  height: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const PostInfoModal: React.FC<Props> = ({
  isModalOpen,
  handleClose,
  post,
}) => {
  const { title, body } = post;

  const comments = useAppSelector((state) => state.comments.comments);

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={styles.post}>
          <div className={styles.post__info}>
              
            <div className="post__title">
              <Typography sx={{ color: '#000' }} id="modal-modal-title" variant="h6" component="h2">
                {title}
              </Typography>
            </div>
            <div className="post__body">
              <Typography id="modal-modal-description" sx={{ mt: 3, color: '#bdbdbd' }}>
                Content:
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 1, color: '#000' }}>
                {body}
              </Typography>
            </div>
          </div>
          <div className={styles.post__comments}>
            {comments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </Box>
    </Modal>
  );
}