import { useSelector } from 'react-redux';

import placeholder from '../../../assets/img/no_images.png';
import { IMG_URL } from '../../../lib/url';

function MemberInformation() {
  const { loginedUser } = useSelector((state) => state.userSlice);

  console.log(loginedUser);

  return (
    <div>
      <h1>MemberInformation</h1>
      <p>회원 정보 조회</p>

      <div>
        <img
          src={
            loginedUser.profileImg
              ? IMG_URL + loginedUser.profileImg
              : placeholder
          }
          width={200}
          alt=""
        />
        <p>아이디: {loginedUser.userId}</p>
        <p>닉네임: {loginedUser.nickname}</p>
      </div>
    </div>
  );
}

export default MemberInformation;
