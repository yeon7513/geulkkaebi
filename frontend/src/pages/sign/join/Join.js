import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import placeholderImg from '../../../assets/img/placeholder.png';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';
import styles from './Join.module.scss';

function Join() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = e.target;

    const formData = {
      id: data.id.value,
      pw: data.pw.value,
      name: data.name.value,
      nickname: data.nickname.value,
      phone: data.phone.value,
      email: data.email.value,
      // profileImg: data.profileImg.value,
    };

    console.log(formData);

    axios
      .post('/users/add', formData)
      .then((res) => {
        if (res.data === 'success') {
          navigate('/');
          console.log('회원 가입 성공');
        } else {
          console.log('회원 가입 실패: ', res.data);
        }
      })
      .catch((err) => {
        console.log('서버 오류: ' + err.message);
      });
  };

  return (
    <form className={styles.joinForm} onSubmit={handleSubmit}>
      <table border="1">
        <tbody>
          <tr>
            <th>
              <label htmlFor="userid">아이디</label>
            </th>
            <td colSpan="3">
              <div className={styles.align}>
                <Input
                  id="userid"
                  name="id"
                  placeholder="아이디 입력"
                  className={styles.fullSize}
                />
                <button>중복 확인</button>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="userpw">비밀번호</label>
            </th>
            <td colSpan="3">
              <Input
                id="userpw"
                name="pw"
                type="password"
                placeholder="비밀번호 입력"
              />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="userpwcheck">비밀번호 확인</label>
            </th>
            <td colSpan="3">
              <Input
                id="userpwcheck"
                type="password"
                placeholder="비밀번호 확인"
              />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="nickname">닉네임</label>
            </th>
            <td colSpan="3">
              <div className={styles.align}>
                <Input
                  id="nickname"
                  name="nickname"
                  placeholder="닉네임 입력"
                  className={styles.fullSize}
                />
                <button type="button">중복 확인</button>
              </div>
              <p>닉네임 미입력시 랜덤으로 만들어집니다.</p>
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="profile">프로필 사진</label>
            </th>
            <td colSpan="3">
              <img src={placeholderImg} alt="" />
              <Input id="profile" name="profileImg" type="file" />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="username">이름</label>
            </th>
            <td>
              <Input id="username" name="name" placeholder="이름" />
            </td>
            <th>
              <label htmlFor="phone">연락처</label>
            </th>
            <td>
              <Input id="phone" name="phone" label="연락처" />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="email">이메일</label>
            </th>
            <td colSpan="3">
              <Input id="email" name="email" label="이메일" />
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.btnGroup}>
        <Button colors="green" type="submit">
          가입하기
        </Button>
        <Button colors="gray" type="button" onClick={() => navigate(-1)}>
          취소
        </Button>
      </div>
    </form>
  );
}

export default Join;
