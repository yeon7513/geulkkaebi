import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoardFetch } from '../../../hooks/useBoardFetch';
import CommonEditor from './common-editor/CommonEditor';

function PostWrite() {
  const { list } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const { boardType, postNo } = useParams();

  // 글 번호가 있으면 수정모드
  const isEdit = !!postNo;
  console.log(isEdit);

  console.log(list.userId);

  // 수정할 글 불러오기
  const { post } = useBoardFetch(boardType, postNo);

  const initTitle = post?.title || '';
  const initText = post?.text || '';
  const isNotice = post?.noticeYn || 0;

  console.log(boardType);
  console.log(postNo);

  const handleSubmit = async ({ title, text, isNotice }) => {
    const postData = {
      boardType,
      title,
      text,
      noticeYn: isNotice ? 1 : 0,
      writer: list.userId,
    };

    console.log(postData);

    try {
      let res;

      if (isEdit) {
        // 수정 모드
        res = await axios.post(`/posts/${boardType}/${postNo}`, postData);
      } else {
        // 글 쓰기 모드
        res = await axios.post('/posts/add', postData);
      }

      // 페이지 이동을 위해
      // isEdit = true이면 update 후 기존 글 번호 반환
      // isEdit = false이면 insert 후 새로운 글 번호 반환 받음
      const savedPostNo = isEdit ? postNo : res.data;

      navigate(`/board/${boardType}/${savedPostNo}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CommonEditor
      initTitle={initTitle}
      initText={initText}
      onSubmit={handleSubmit}
    />
  );
}

export default PostWrite;
