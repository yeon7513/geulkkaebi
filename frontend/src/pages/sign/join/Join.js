import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';
import styles from './Join.module.scss';

import {
  TbAsterisk,
  TbCake,
  TbLego,
  TbLock,
  TbLockCheck,
  TbMail,
  TbPencil,
  TbPhone,
  TbUser,
} from 'react-icons/tb';
import ProfileImageUpload from '../../../components/profile-image-upload/ProfileImageUpload';

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

    const userData = {
      id: data.id.value,
      pw: data.pw.value,
      name: data.name.value,
      nickname: data.nickname.value,
      phone: data.phone.value,
      email: data.email.value,
    };

    const formData = new FormData();

    formData.append(
      'user',
      new Blob([JSON.stringify(userData)], { type: 'application/json' })
    );

    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    console.log(formData);

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
        console.log('서버 오류: ', err.message);
      });
  };

  return (
    <form className={styles.joinForm} onSubmit={handleSubmit}>
      <p className={styles.requiredInfo}>
        <TbAsterisk /> 표시 항목은 필수 입력입니다.
      </p>
      <div className={styles.joinContent}>
        <ul className={styles.requiredField}>
          <li>
            <label htmlFor="userid">
              <TbPencil />
              <span className={styles.requiredIcon}>
                <TbAsterisk />
              </span>
            </label>
            <Input
              id="userid"
              name="id"
              placeholder="아이디 (4자리 이상)"
              className={styles.fullSize}
            />
            <Button type="button" variant="outline">
              중복 확인
            </Button>
          </li>
          <li>
            <label htmlFor="userpw">
              <TbLock />
              <span className={styles.requiredIcon}>
                <TbAsterisk />
              </span>
            </label>
            <Input
              id="userpw"
              name="pw"
              type="password"
              placeholder="비밀번호 (문자, 숫자 조합 8~12자리)"
            />
          </li>
          <li>
            <label htmlFor="userpwcheck">
              <TbLockCheck />
              <span className={styles.requiredIcon}>
                <TbAsterisk />
              </span>
            </label>
            <Input
              id="userpwcheck"
              type="password"
              placeholder="비밀번호 확인"
            />
          </li>
          <li>
            <label htmlFor="username">
              <TbUser />
              <span className={styles.requiredIcon}>
                <TbAsterisk />
              </span>
            </label>
            <Input id="username" name="name" placeholder="이름" />
          </li>
          <li>
            <label htmlFor="birth">
              <TbCake />
              <span className={styles.requiredIcon}>
                <TbAsterisk />
              </span>
            </label>
            <Input
              id="birth"
              name="birth"
              placeholder="생년월일 (ex: 20010509)"
            />
          </li>
          <li>
            <label htmlFor="phone">
              <TbPhone />
              <span className={styles.requiredIcon}>
                <TbAsterisk />
              </span>
            </label>
            <Input
              id="phone"
              name="phone"
              placeholder="연락처 (ex: 010-0000-0000)"
            />
          </li>
          <li>
            <label htmlFor="email">
              <TbMail />
              <span className={styles.requiredIcon}>
                <TbAsterisk />
              </span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일 (ex: gkkb@email.com)"
            />
          </li>
        </ul>
        <ul className={styles.optionalField}>
          <li>
            <ProfileImageUpload
              preview={preview}
              onFileChange={handleImageChange}
            />
            <div>
              <label htmlFor="nickname">
                <TbLego />
              </label>
              <Input
                id="nickname"
                name="nickname"
                placeholder="닉네임 입력"
                className={styles.fullSize}
              />
              <Button type="button" variant="outline">
                중복 확인
              </Button>
            </div>
          </li>
        </ul>
      </div>
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
