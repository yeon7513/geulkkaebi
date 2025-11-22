import { TbLego, TbMail, TbPhone } from 'react-icons/tb';
import Button from '../../../../components/button/Button';
import TextInput from '../../../../components/input/text-input/TextInput';
import ProfileImageUpload from '../../../../components/profile-image-upload/ProfileImageUpload';
import styles from '../Join.module.scss';

import cn from 'classnames';

function OptionalSection({ preview, handleChange }) {
  return (
    <div className={cn(styles.formSection, styles.optional)}>
      <h2>
        <span className={styles.accent}>[선택]</span> 추가 정보
      </h2>
      <div className={styles.contents}>
        {/* 프로필 사진 등록 */}
        <ProfileImageUpload
          imgSize="160"
          preview={preview}
          onFileChange={handleChange}
        />
        <ul>
          {/* 닉네임 입력 */}
          <li>
            <label htmlFor="nickname" className={styles.label}>
              <TbLego />
            </label>
            <div className={styles.align}>
              <TextInput
                id="nickname"
                name="nickname"
                placeholder="닉네임 입력"
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
            <TextInput
              id="phone"
              name="phone"
              placeholder="연락처 (ex: 010-0000-0000)"
              className={styles.input}
            />
          </li>
          <li>
            <label htmlFor="email" className={styles.label}>
              <TbMail />
            </label>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="이메일 (ex: gkkb@email.com)"
              className={styles.input}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OptionalSection;
