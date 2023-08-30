import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { errorStyles, tableStyle } from '../../styles/styles';
import { AddForm } from '../AddForm/AddForm';

type Props = {
  addPostError: boolean,
  handleModalToggle: () => void,
  handleClose: () => void,
  isModalOpen: boolean,
  onAddPost: (postTitle: string, postBody: string) => void
}

export const CreatePostModal: React.FC<Props> = ({
  addPostError,
  handleModalToggle,
  handleClose,
  isModalOpen,
  onAddPost,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={tableStyle}>
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '16px'
          }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Publish a post
        </Typography>

        <AddForm
          onAddPost={onAddPost}
          handleModalToggle={handleModalToggle}
        />

        {addPostError &&
          <Typography sx={errorStyles} variant="h6" component="h2">
            Error, check your inputs!
          </Typography>
        }
      </Box>
    </Modal>
  )
}