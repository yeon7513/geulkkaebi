import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoardFetch } from '../../../hooks/useBoardFetch';
import CommonEditor from './common-editor/CommonEditor';

function PostWrite() {
  const navigate = useNavigate();
  const { boardType, postNo } = useParams();

  // 글 번호가 있으면 수정모드
  const isEdit = !!postNo;

  // 수정할 글 불러오기
  const { post } = useBoardFetch(boardType, postNo);

  const initTitle = post?.title || '';
  const initText = post?.text || '';

  const handleSubmit = async (postData) => {
    console.log(postData);

    try {
      let res;

      if (isEdit) {
        // 수정 모드
        res = await axios.post(
          `/posts/${postData.boardType}/${postData.postNo}`,
          postData
        );
      } else {
        // 글 쓰기 모드
        res = await axios.post('/posts/add', postData);
      }

      // 페이지 이동을 위해
      // isEdit = true이면 update 후 기존 글 번호 반환
      // isEdit = false이면 insert 후 새로운 글 번호 반환 받음
      const savedPostNo = isEdit ? postData.postNo : res.data;

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

  return (
    <CommonEditor
      initTitle={initTitle}
      initText={initText}
      onSubmit={handleSubmit}
    />
  );
}

export default PostWrite;
