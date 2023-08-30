import React, { useState, useEffect, useCallback } from 'react';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import Button from '@mui/material/Button';
import styles from './PostList.module.scss';
import { CreatePostModal } from '../CreatePostModal/CreatePostModal';
import { addButtonStyles, postListTitleStyles } from '../../styles/styles';
import { PostCard } from '../PostCard/PostCard';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addPost, fetchPosts } from '../../features/posts';
import {  Typography } from '@mui/material';

const responsiveSettings = {
  desktop: {
    breakpoint: { max: 3000, min: 100 },
    items: 4,
    slidesToSlide: 1,
  },
}

export const PostList: React.FC = () => {
  const [addPostError, setAddPostError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch((fetchPosts()));
  }, [dispatch]);

  const createNewPost = useCallback(async (
    postTitle: string,
    postBody: string,
  ) => {
    const newPost = {
      title: postTitle,
      body: postBody,
    }

    try {
      await dispatch(addPost(newPost));
    } catch {
      throw new Error('Unable to publish a post');
    }
  }, [dispatch]);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    setAddPostError(false);

  };

  const handleClose = () => {
    setIsModalOpen(false);
    setAddPostError(false);
  };

  return (
    <div className={styles.postList}>
      <div className={styles.carousel__container}>
        <div className={styles.HeaderContainer}>
          <Typography sx={postListTitleStyles} id="modal-modal-title" variant="h3" component="h2">
            Post Carousel
          </Typography>
        </div>

        <Carousel
          itemClass={styles.Cards}
          responsive={responsiveSettings}
          partialVisible={true}
          infinite
          draggable={false}
        >
          {posts.map(post => (
            <PostCard post={post} key={post.id} />
          ))}
        </Carousel>
      </div >

      <div className={styles.postList__buttons}>
        <Button
          sx={addButtonStyles}
          onClick={handleModalToggle}
        >
          Add a post
        </Button>
      </div>

      <CreatePostModal
        addPostError={addPostError}
        handleModalToggle={handleModalToggle}
        handleClose={handleClose}
        isModalOpen={isModalOpen}
        onAddPost={createNewPost}
      />
    </div>
  );
}