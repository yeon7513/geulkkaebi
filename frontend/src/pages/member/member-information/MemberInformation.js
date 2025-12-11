import { useDispatch, useSelector } from 'react-redux';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import placeholder from '../../../assets/img/no_images.png';
import { STATUS } from '../../../store/common/commoms';
import { logout } from '../../../store/user/userSlice';

import Button from '../../../components/button/Button';
import { IMG_URL } from '../../../lib/url';
import {
  formatBirth,
  formatDateTimeKorean,
  formatGrade,
  formatGradeBylabel,
  formatScoreByLabel,
} from '../../../utils/formatter';
import styles from './MemberInformation.module.scss';

import cn from 'classnames';

function MemberInformation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const { loginedUser, status } = useSelector((state) => state.userSlice);

  const isMain = pathname === '/';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

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
    <div className={cn(styles.myInfo, isMain ? '' : styles.memberInfo)}>
      {!isMain && <h2>내 정보 조회</h2>}
      <div className={styles.contents}>
        {isMain && <h2>{loginedUser.nickname}님, 안녕하세요!</h2>}
        <img
          src={
            loginedUser.profileImg
              ? IMG_URL + loginedUser?.profileImg
              : placeholder
          }
          className={styles.profileImg}
          alt={`${loginedUser.userId} 프로필 사진`}
        />
        <div className={styles.card}>
          <p className={styles.user}>
            <span className={styles.grade}>
              {formatGrade(loginedUser.grade)}
            </span>
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
      {!isMain && (
        <div className={styles.detail}>
          <ul className={styles.basic}>
            <li>
              <span>아이디</span>
              {loginedUser.userId}
            </li>
            <li>
              <span>닉네임</span>
              {loginedUser.nickname}
            </li>
          </ul>
          <ul className={styles.personal}>
            <li>
              <span>이름</span>
              {loginedUser.name}
            </li>
            <li>
              <span>생년월일</span>
              {formatBirth(loginedUser.birth)}
            </li>
            <li>
              <span>성별</span>
              {loginedUser.gender === 'M' ? '남자' : '여자'}
            </li>
          </ul>
          <ul className={styles.level}>
            <li>
              <span>회원 등급</span>
              <div className={styles.desc}>
                <span>{loginedUser.grade}</span>
                {formatGradeBylabel(loginedUser.grade)}
              </div>
            </li>
            <li>
              <span>퀴즈 점수</span>
              <div className={styles.desc}>
                <span>{loginedUser.score}</span>
                {formatScoreByLabel(loginedUser.score)}
              </div>
            </li>
          </ul>
          <ul className={styles.contact}>
            <li>
              <span>연락처</span>
              {loginedUser.phone}
            </li>
            <li>
              <span>이메일</span>
              {loginedUser.email}
            </li>
          </ul>
          <ul className={styles.date}>
            <li>
              <span>회원가입일</span>
              {formatDateTimeKorean(loginedUser.createdAt)}
            </li>
            <li>
              <span>정보수정일</span>
              {formatDateTimeKorean(loginedUser.modifiedAt)}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MemberInformation;
