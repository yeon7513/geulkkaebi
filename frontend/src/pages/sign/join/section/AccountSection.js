import cn from 'classnames';
import { TbAsterisk, TbLock, TbLockCheck, TbPencil } from 'react-icons/tb';
import Button from '../../../../components/button/Button';
import TextInput from '../../../../components/input/text-input/TextInput';
import styles from '../Join.module.scss';

function AccountSection() {
  return (
    <div className={cn(styles.formSection, styles.account)}>
      <h2>
        <span className={styles.accent}>[필수]</span> 계정 정보
      </h2>
      <ul className={styles.content}>
        {/* 아이디 입력 */}
        <li>
          <label htmlFor="userId" className={styles.label}>
            <TbPencil />
            <span className={styles.requiredIcon}>
              <TbAsterisk />
            </span>
          </label>
          <div className={styles.align}>
            <TextInput
              id="userId"
              name="userId"
              placeholder="아이디 (4자리 이상)"
              className={styles.input}
            />
            <Button type="button" variant="outline" className={styles.checkBtn}>
              중복 확인
            </Button>
          </div>
        </li>
        {/* 비밀번호 입력 */}
        <li>
          <label htmlFor="userPw" className={styles.label}>
            <TbLock />
            <span className={styles.requiredIcon}>
              <TbAsterisk />
            </span>
          </label>
          <TextInput
            id="userPw"
            name="userPw"
            type="password"
            placeholder="비밀번호 (문자, 숫자 조합 8~12자리)"
            className={styles.input}
          />
        </li>
        {/* 비밀번호 확인 입력 */}
        <li>
          <label htmlFor="userPwCheck" className={styles.label}>
            <TbLockCheck />
            <span className={styles.requiredIcon}>
              <TbAsterisk />
            </span>
          </label>
          <TextInput
            id="userPwCheck"
            type="password"
            placeholder="비밀번호 확인"
            className={styles.input}
          />
        </li>
      </ul>
    </div>
  );
}

export default AccountSection;
