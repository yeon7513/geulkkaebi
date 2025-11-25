import axios from 'axios';
import styles from './tool-items.module.scss';

import { useRef } from 'react';
import { FaImage } from 'react-icons/fa6';
import { IMG_URL } from './../../../../../lib/url';

function PostImageUpload({ editor }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  // 이미지 업로드 핸들러
  const handleChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'posts');

    try {
      const res = await axios.post('/images/uploadImages', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = res.data;

      editor
        .chain()
        .focus()
        .setImage({ src: IMG_URL + imageUrl })
        .run();
    } catch (error) {
      console.log('Image upload failed: ', error);
    }

    e.target.value = '';
  };

  return (
    <div className={styles.tools}>
      <button className={styles.icon} type="button" onClick={handleClick}>
        <FaImage />
      </button>
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
}

export default PostImageUpload;
