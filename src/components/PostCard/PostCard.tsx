import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Post } from '../../types/Post';
import { useAppDispatch } from '../../app/hooks';
import { fetchComments } from '../../features/comments';
import { PostInfoModal } from '../PostInfoModal/PostInfoModal';
import { buttonCreateFormStyles } from '../../styles/styles';


type Props = {
  post: Omit<Post, 'userId'>
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const { title, body, id } = post;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  function loadComments(id: number) {
    dispatch(fetchComments(id));
  }

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const openComments = (postId: number) => {
    loadComments(postId);
    handleOpen();
  }

  return (
    <>
      <Card sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 300,
        height: 320,
        marginBottom: '10px'
      }}
      >
        <CardContent>
          <Typography sx={{fontSize: 20, textAlign: 'start', marginBottom: '20px', borderBottom:'1px solid #fff'}} variant="h5">
            {title}
          </Typography>

          <Typography sx={{fontSize: 15, textAlign: 'end'}} variant="body2">
            {body}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            style={buttonCreateFormStyles}
            onClick={() => openComments(id)}
          >
            Open comments
          </Button>
        </CardActions>
      </Card >

      <PostInfoModal 
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        post={post} 
      />
    </>
  );
}