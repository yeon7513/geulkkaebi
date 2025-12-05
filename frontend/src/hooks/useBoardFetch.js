import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllPostData,
  fetchPostDetail,
  incrementHitcount,
} from '../store/board/postSlice';

export const useBoardFetch = (
  postNo = null,
  boardType = 'all',
  page = 0,
  size = 0
) => {
  const {
    postList,
    postItem,
    prevPost,
    nextPost,
    totalPages,
    totalPosts,
    status,
  } = useSelector((state) => state.postSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postNo) {
      dispatch(fetchPostDetail({ postNo, boardType }));
      dispatch(incrementHitcount(Number(postNo)));
    } else {
      dispatch(fetchAllPostData({ boardType, page, size }));
    }
  }, [dispatch, postNo, boardType, page, size]);

  return {
    postList,
    postItem,
    prevPost,
    nextPost,
    totalPages,
    totalPosts,
    status,
  };
};
