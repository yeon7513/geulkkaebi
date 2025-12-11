import { useEffect, useState } from 'react';
import { TbLego, TbLock, TbLockCheck, TbMail, TbPhone } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileImageUpload from '../../../components/profile-image-upload/ProfileImageUpload';
import { IMG_URL } from '../../../lib/url';
import { userInfoUpdate } from '../../../store/user/userSlice';
import Button from './../../../components/button/Button';
import styles from './UpdateInfo.module.scss';

function UpdateInfo() {
  const { loginedUser } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 이미지 미리보기용 state
  const [preview, setPreview] = useState(null);
  // 서버 전송용 이미지 파일 저장 state
  const [selectedFile, setSelectedFile] = useState(null);
  // 기존 DB 데이터 저장용 state
  const [values, setValues] = useState({
    userId: loginedUser?.userId || '',
    userPw: loginedUser?.userPw || '',
    name: loginedUser?.name || '',
    nickname: loginedUser?.nickname || '',
    phone: loginedUser?.phone || '',
    email: loginedUser?.email || '',
    profileImg: IMG_URL + loginedUser?.profileImg || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file) => {
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = e.target;

    const updateData = {
      ...loginedUser,
      userPw: data.userPw.value || loginedUser.userPw,
      nickname: data.nickname.value,
      phone: data.phone.value,
      email: data.email.value,
    };

    const formData = new FormData();

    try {
      formData.append(
        'user',
        new Blob([JSON.stringify(updateData)], { type: 'application/json' })
      );

      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      dispatch(
        userInfoUpdate({ userId: loginedUser.userId, updateData: formData })
      );
      navigate('/mypage');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginedUser) {
      setValues({
        userId: loginedUser.userId,
        userPw: loginedUser.userPw,
        nickname: loginedUser.nickname,
        phone: loginedUser.phone,
        email: loginedUser.email,
        profileImg: IMG_URL + loginedUser.profileImg,
      });
    }
  }, [loginedUser]);

  useEffect(() => {
    if (loginedUser?.profileImg) {
      setPreview(IMG_URL + loginedUser.profileImg);
    }
  }, [loginedUser?.profileImg]);

  return (
    <div className={styles.update}>
      <h2>내 정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.contents}>
          <div className={styles.profileImg}>
            <ProfileImageUpload
              preview={preview || values.profileImg}
              onFileChange={handleImageChange}
            />
          </div>
          <ul className={styles.data}>
            {/* 비밀번호 입력 */}
            <li>
              <label htmlFor="userPw" className={styles.label}>
                <TbLock />
              </label>
              <input
                id="userPw"
                name="userPw"
                type="password"
                placeholder="비밀번호 (문자, 숫자 조합 8~12자리)"
                className={styles.input}
                onChange={handleChange}
                autoComplete="off"
              />
            </li>
            {/* 비밀번호 확인 입력 */}
            <li>
              <label htmlFor="userPwCheck" className={styles.label}>
                <TbLockCheck />
              </label>
              <input
                id="userPwCheck"
                type="password"
                placeholder="비밀번호 확인"
                className={styles.input}
                onChange={handleChange}
                autoComplete="off"
              />
            </li>
            {/* 닉네임 입력 */}
            <li>
              <label htmlFor="nickname" className={styles.label}>
                <TbLego />
              </label>
              <div className={styles.align}>
                <input
                  id="nickname"
                  name="nickname"
                  value={values.nickname}
                  placeholder="닉네임 입력"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <Button
                  type="button"
                  variant="outline"
                  className={styles.checkBtn}
                >
                  중복 확인
                </Button>
              </div>
            </li>
            <li>
              <label htmlFor="phone" className={styles.label}>
                <TbPhone />
              </label>
              <input
                id="phone"
                name="phone"
                value={values.phone}
                placeholder="연락처 (ex: 010-0000-0000)"
                className={styles.input}
                onChange={handleChange}
                autoComplete="off"
              />
            </li>
            <li>
              <label htmlFor="email" className={styles.label}>
                <TbMail />
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                placeholder="이메일 (ex: gkkb@email.com)"
                className={styles.input}
                onChange={handleChange}
                autoComplete="off"
              />
            </li>
          </ul>
        </div>
        <div className={styles.submit}>
          <Button type="submit">변경</Button>
          <Button
            type="button"
            colors="gray"
            onClick={() => navigate('/mypage')}
          >
            취소
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateInfo;
