import React from 'react';
import Typography from '@mui/material/Typography';
import { Comment } from '../../types/Comment';
import { Paper } from '@mui/material';
import styles from './CommentCard.module.scss';

type Props = {
  comment: Comment;
};


export const CommentCard: React.FC<Props> = ({ comment }) => {
  const { name, email, body } = comment;
  return (
    <Paper variant="outlined" sx={{ height: '90px', mb: '8px' }}>
      <div className={styles.comment__sender}>
        <Typography sx={{ fontSize: 14 }}>
          {`Topic: ${name}`}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
          {`From: ${email}`}
        </Typography>
      </div>
      <div className={styles.comment__content}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {body}
        </Typography>
      </div>
    </Paper>
  );
}