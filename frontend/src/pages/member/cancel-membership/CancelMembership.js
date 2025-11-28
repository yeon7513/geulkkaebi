import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import { userDelete } from '../../../store/user/userSlice';

function CancelMembership() {
  const [isChecked, setIsChecked] = useState(false);

  const { loginedUser } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(loginedUser);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userDelete({ userId: loginedUser.userId }));
    navigate('/');
  };

  return (
    <div>
      <h1>CancelMembership</h1>
      <p>회원 탈퇴</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input id="check" type="checkbox" />
          <label htmlFor="check">회원 탈퇴에 동의하십니까?</label>
        </div>
        <Button type="submit" colors="orange">
          탈퇴
        </Button>
        <Button type="button" colors="gray">
          취소
        </Button>
      </form>
    </div>
  );
}

export default CancelMembership;
