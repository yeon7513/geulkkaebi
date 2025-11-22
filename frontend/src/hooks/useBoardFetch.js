import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPostData } from '../store/board/postSlice';

export const useBoardFetch = (
  boardType = null,
  postNo = null,
  writer = null,
  isReport = false
) => {
  const { post, status } = useSelector((state) => state.postSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPostData({ postNo, boardType, writer, isReport }));
  }, [dispatch, postNo, boardType, writer, isReport]);

  return { post, status };
};
