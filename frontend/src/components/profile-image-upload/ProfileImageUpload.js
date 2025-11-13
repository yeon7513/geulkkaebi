import cn from 'classnames';
import { useRef } from 'react';
import placeholder from '../../assets/img/no_images.png';
import styles from './ProfileImageUpload.module.scss';

function ProfileImageUpload({ preview, onFileChange, className }) {
  const fileInputRef = useRef();

  const handleClickImage = () => {
    fileInputRef.current.click();
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div className={cn(styles.profileUpload, className)}>
      <img
        src={preview || placeholder}
        alt="profile-image"
        onClick={handleClickImage}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChangeFile}
      />
      <div className={styles.overlay}>변경</div>
    </div>
  );
}

export default ProfileImageUpload;
