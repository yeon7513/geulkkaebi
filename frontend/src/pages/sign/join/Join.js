import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import placeholderImg from '../../../assets/img/no_images.png';
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
      <ul>
        <li>
          <label htmlFor="userid">아이디</label>
          <Input
            id="userid"
            name="id"
            placeholder="아이디 입력"
            className={styles.fullSize}
          />
          <Button type="button" variant="outline">
            중복 확인
          </Button>
        </li>
        <li>
          <label htmlFor="userpw">비밀번호</label>
          <Input
            id="userpw"
            name="pw"
            type="password"
            placeholder="비밀번호 입력"
          />
        </li>
        <li>
          <label htmlFor="userpwcheck">비밀번호 확인</label>
          <Input id="userpwcheck" type="password" placeholder="비밀번호 확인" />
        </li>
        <li>
          <label htmlFor="nickname">닉네임</label>
          <Input
            id="nickname"
            name="nickname"
            placeholder="닉네임 미입력시 랜덤으로 만들어집니다."
            className={styles.fullSize}
          />
          <Button type="button" variant="outline">
            중복 확인
          </Button>
        </li>
        <li>
          <label htmlFor="profile">프로필 사진</label>
          <img className={styles.profileImg} src={placeholderImg} alt="" />
          <Input id="profile" name="profileImg" type="file" />
        </li>
        <li>
          <label htmlFor="username">이름</label>
          <Input id="username" name="name" placeholder="이름" />
        </li>
        <li>
          <label htmlFor="phone">연락처</label>
          <Input id="phone" name="phone" placeholder="연락처" />
        </li>
        <li>
          <label htmlFor="email">이메일</label>
          <Input id="email" name="email" placeholder="이메일" />
        </li>
      </ul>
      <div className={styles.btnGroup}>
        <Button variant="pushable" colors="green" type="submit">
          가입하기
        </Button>
        <Button
          variant="pushable"
          colors="gray"
          type="button"
          onClick={() => navigate(-1)}
        >
          취소
        </Button>
      </div>
    </form>
  );
}

export default Join;
