import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import styles from './Join.module.scss';

import axios from 'axios';
import CheckBox from '../../../components/input/check-box/CheckBox';
import AccountSection from './section/AccountSection';
import OptionalSection from './section/OptionalSection';
import PersonalSection from './section/PersonalSection';

function Join() {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (file) => {
    if (file) {
      setSelectedFile(file);
      // 임시 미리보기 생성
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = e.target;

    // 생년월일 포맷팅
    const year = data.year.value;
    const month = data.month.value.padStart(2, '0');
    const day = data.day.value.padStart(2, '0');

    const birth = `${year}-${month}-${day}`;

    const userData = {
      userId: data.userId.value,
      userPw: data.userPw.value,
      name: data.username.value,
      birth: birth,
      gender: data.gender.value,
      nickname: data.nickname.value,
      phone: data.phone.value,
      email: data.email.value,
    };

    console.log(userData);

    const formData = new FormData();

    formData.append(
      'user',
      new Blob([JSON.stringify(userData)], { type: 'application/json' })
    );

    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    axios
      .post('/users/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data === 'success') {
          navigate('/');
          console.log('회원 가입 성공');
        } else {
          console.log('회원 가입 실패: ', res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('서버 오류: ', err.message);
      });
  };

  return (
    <form className={styles.joinForm} onSubmit={handleSubmit}>
      <div className={styles.joinContainer}>
        <AccountSection />
        <PersonalSection />
        <OptionalSection preview={preview} handleChange={handleImageChange} />
      </div>
      <CheckBox
        id="joinCheck"
        className={styles.oath}
        label="글깨비 친구로서 규칙을 지키며 즐겁게 이용할 것을 선서합니다!"
      />
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
