import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPostData } from '../store/board/postSlice';

export const useBoardFetch = (
  boardType = 'all',
  postNo = null,
  writer = null,
  isReport = false,
  page,
  size
) => {
  const { post, totalPages, totalPosts, status } = useSelector(
    (state) => state.postSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchAllPostData({ postNo, boardType, writer, isReport, page, size })
    );
  }, [dispatch, postNo, boardType, writer, isReport, page, size]);

  return { post, totalPages, totalPosts, status };
};
