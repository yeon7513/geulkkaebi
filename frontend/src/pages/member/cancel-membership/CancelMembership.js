import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import CheckBox from '../../../components/input/check-box/CheckBox';
import { userDelete } from '../../../store/user/userSlice';

import { TiWarning } from 'react-icons/ti';

import styles from './CancelMembership.module.scss';

function CancelMembership() {
  const [isChecked, setIsChecked] = useState(false);

  const { loginedUser } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isChecked) {
      alert('회원 탈퇴에 동의하셔야 탈퇴가 가능합니다.');
      return;
    }

    const isConfirmed = window.confirm('정말로 탈퇴하시겠습니까?');

    if (!isConfirmed) {
      return;
    }

    dispatch(userDelete({ userId: loginedUser.userId }));

    alert('회원 탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.');
    navigate('/');
  };

  return (
    <div className={styles.cancelMember}>
      <h2>회원 탈퇴</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.warning}>
          <h3>
            <TiWarning color="#e43636" />
            탈퇴 시 주의사항
          </h3>
          <ul className={styles.notice}>
            <li>
              1. 탈퇴하면 회원 정보와 퀴즈 기록, 보유 점수가 모두 삭제됩니다.
            </li>
            <li>2. 삭제된 정보는 다시 복구할 수 없습니다.</li>
            <li>
              3. 게시글과 댓글은 서비스 품질 유지를 위해 남게 되며 이후 편집은
              불가합니다.
            </li>
            <li>4. 재가입 시에도 기존 점수 및 랭킹은 이어지지 않습니다.</li>
          </ul>
        </div>
        <div className={styles.check}>
          <CheckBox
            id="cancelCheck"
            name="cancelCheck"
            label="위 주의사항을 꼼꼼하게 읽었으며, 탈퇴에 동의합니다."
            onChange={() => setIsChecked(!isChecked)}
          />
        </div>
        <div className={styles.submit}>
          <Button type="submit" colors="orange">
            탈퇴
          </Button>
          <Button type="button" colors="gray">
            취소
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CancelMembership;
