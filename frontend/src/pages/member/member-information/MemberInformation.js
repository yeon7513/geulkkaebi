import { useSelector } from 'react-redux';

import placeholder from '../../../assets/img/no_images.png';
import { IMG_URL } from '../../../lib/url';

function MemberInformation() {
  const { list } = useSelector((state) => state.userSlice);

  console.log(list);

  return (
    <div>
      <h1>MemberInformation</h1>
      <p>회원 정보 조회</p>

      <div>
        <img
          src={list.profileImg ? IMG_URL + list.profileImg : placeholder}
          width={200}
          alt=""
        />
        <p>아이디: {list.id}</p>
        <p>닉네임: {list.nickname}</p>
      </div>
    </div>
  );
}

export default MemberInformation;
