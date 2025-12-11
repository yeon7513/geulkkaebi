import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearPostItem, fetchPostDetail } from '../../../store/board/postSlice';
import CommonEditor from './common-editor/CommonEditor';

function PostWrite() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { boardType, postNo } = useParams();

  // 글 번호가 있으면 수정모드
  const isEdit = !!postNo;

  // 수정할 글 불러오기
  const { postItem } = useSelector((state) => state.postSlice);

  // 초기값 (수정할 글이 있다면)
  const initTitle = postItem?.title || '';
  const initText = postItem?.text || '';
  const initBoardType = boardType || '';

  // 서버 전송 핸들러
  const handleSubmit = async (postData) => {
    try {
      let res;

      const updateData = {
        ...postItem,
        ...postData,
      };

      if (isEdit) {
        // 수정 모드
        res = await axios.post(
          `/posts/update/${postData.boardType}/${postNo}`,
          updateData
        );
      } else {
        // 글 쓰기 모드
        res = await axios.post('/posts/add', postData);
      }

      // 페이지 이동을 위해
      // isEdit = true이면 update 후 기존 글 번호 반환
      // isEdit = false이면 insert 후 새로운 글 번호 반환 받음
      const savedPostNo = isEdit ? postNo : res.data;

      // 관리자 전용 카테고리 목록
      const adminCategories = ['notice', 'event', 'faq'];

      // 경로 결정
      const basePath = adminCategories.includes(postData.boardType)
        ? '/support'
        : '/board';

      navigate(`${basePath}/${postData.boardType}/${savedPostNo}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 수정할 글 dispatch
  useEffect(() => {
    if (isEdit) {
      dispatch(fetchPostDetail({ postNo, boardType }));
    }
  }, [dispatch, isEdit, postNo, boardType]);

  // 첫 렌더링 시 리덕스 초기화
  useEffect(() => {
    dispatch(clearPostItem());
  }, [dispatch]);

  return (
    <CommonEditor
      initTitle={initTitle}
      initText={initText}
      initBoardType={initBoardType}
      onSubmit={handleSubmit}
    />
  );
}

export default PostWrite;
