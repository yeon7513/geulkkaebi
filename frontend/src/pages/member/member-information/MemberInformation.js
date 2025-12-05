import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import placeholder from '../../../assets/img/no_images.png';
import { STATUS } from '../../../store/common/commoms';
import { logout } from '../../../store/user/userSlice';

import Button from '../../../components/button/Button';
import { IMG_URL } from '../../../lib/url';
import { formatGrade } from '../../../utils/formatter';
import styles from './MemberInformation.module.scss';

function MemberInformation() {
  const { loginedUser, status } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  console.log(loginedUser);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // useEffect(() => {
  //   dispatch(loginCheck());
  // }, [dispatch]);

  if (status === STATUS.LOADING) {
    return <div>불러오는 중....</div>;
  }

  if (!loginedUser) {
    return (
      <>
        <div>로그인이 필요합니다.</div>
        <Link to="/">메인페이지 이동</Link>
      </>
    );
  }

  return (
    <div className={styles.contents}>
      <h2>{loginedUser.nickname}님, 안녕하세요!</h2>
      <img
        src={
          loginedUser.profileImg
            ? IMG_URL + loginedUser?.profileImg
            : placeholder
        }
        className={styles.profileImg}
        alt={`${loginedUser.userId} 프로필 사진`}
      />
      <div className={styles.info}>
        <p className={styles.user}>
          <span className={styles.grade}>{formatGrade(loginedUser.grade)}</span>
          {loginedUser.nickname}
          <span className={styles.id}>({loginedUser.userId})</span>
        </p>
        <p className={styles.date}>{loginedUser.createdAt}</p>
      </div>
      <div className={styles.manageBtns}>
        {loginedUser.adminYn === 1 && (
          <Button
            variant="outline"
            colors="mint"
            onClick={() => navigate('/manager')}
          >
            관리
          </Button>
        )}
        <Button variant="outline" onClick={() => navigate('/mypage/update')}>
          정보수정
        </Button>
        <Button variant="outline" colors="gray" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
}

export default MemberInformation;
