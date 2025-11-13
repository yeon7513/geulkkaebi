import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileImageUpload from '../../../components/profile-image-upload/ProfileImageUpload';
import { IMG_URL } from '../../../lib/url';
import { userInfoUpdate } from '../../../store/user/userSlice';
import Button from './../../../components/button/Button';

function UpdateInfo() {
  const { list } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [values, setValues] = useState({
    id: list?.id || '',
    pw: list?.pw || '',
    name: list?.name || '',
    nickname: list?.nickname || '',
    phone: list?.phone || '',
    email: list?.email || '',
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
      id: values.id,
      pw: data.pw.value,
      nickname: data.nickname.value,
      phone: data.phone.value,
      email: data.email.value,
    };

    console.log(list.userNo);

    const formData = new FormData();

    try {
      formData.append(
        'user',
        new Blob([JSON.stringify(updateData)], { type: 'application/json' })
      );

      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      dispatch(userInfoUpdate({ userNo: list.userNo, updateData: formData }));
      navigate('/mypage');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (list) {
      setValues({
        id: list.id,
        pw: list.pw,
        name: list.name,
        nickname: list.nickname,
        phone: list.phone,
        email: list.email,
      });
    }
  }, [list]);

  useEffect(() => {
    if (list?.profileImg) {
      setPreview(IMG_URL + list.profileImg);
    }
  }, [list?.profileImg]);

  return (
    <div>
      <h1>UpdateInfo</h1>
      <p>내 정보 수정</p>
      <form onSubmit={handleSubmit}>
        <div>
          <ProfileImageUpload
            preview={list.profileImg ? preview : selectedFile}
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label>아이디</label>
          <input type="text" defaultValue={values.id || ''} readOnly />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="text"
            name="pw"
            value={values.pw || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">이름</label>
          <input type="text" defaultValue={values.name || ''} readOnly />
        </div>
        <div>
          <label htmlFor="">닉네임</label>
          <input
            type="text"
            name="nickname"
            value={values.nickname || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">연락처</label>
          <input
            type="text"
            name="phone"
            value={values.phone || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">이메일</label>
          <input
            type="text"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button type="submit">변경</Button>
          <Button type="button" onClick={() => navigate('/mypage')}>
            취소
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateInfo;
