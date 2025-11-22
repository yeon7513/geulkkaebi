import RadioButton from '../../../../components/input/radio-button/RadioButton';
import SelectBox from '../../../../components/input/select-box/SelectBox';
import TextInput from '../../../../components/input/text-input/TextInput';
import styles from '../Join.module.scss';

import cn from 'classnames';

import { TbAsterisk, TbCake, TbId, TbUser } from 'react-icons/tb';

function PersonalSection() {
  return (
    <div className={cn(styles.formSection, styles.personal)}>
      <h2>
        <span className={styles.accent}>[필수]</span> 개인 정보
      </h2>
      <ul>
        <li>
          {/* 이름 입력 */}
          <div className={cn(styles.align, styles.name)}>
            <label htmlFor="username" className={styles.label}>
              <TbId />
              <span className={styles.requiredIcon}>
                <TbAsterisk />
              </span>
            </label>
            <TextInput
              id="username"
              name="username"
              className={styles.input}
              placeholder="이름"
            />
          </div>
          {/* 성별 */}
          <div className={cn(styles.align, styles.gender)}>
            <div className={styles.label}>
              <TbUser />
              <span className={styles.requiredIcon}>
                <TbAsterisk />
              </span>
            </div>
            <div className={styles.selectGender}>
              <RadioButton name="gender" value="M">
                남자
              </RadioButton>
              <RadioButton name="gender" value="W">
                여자
              </RadioButton>
            </div>
          </div>
        </li>
        {/* 생년월일 */}
        <li>
          <label htmlFor="birth" className={styles.label}>
            <TbCake />
            <span className={styles.requiredIcon}>
              <TbAsterisk />
            </span>
          </label>
          <div className={styles.birthContent}>
            <div className={cn(styles.date, styles.year)}>
              <TextInput
                id="birth"
                type="text"
                name="year"
                placeholder="연 4자리 (ex: 2001)"
              />
              <span>년</span>
            </div>
            <div className={styles.date}>
              <SelectBox name="month">
                <option value="">월 선택</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </SelectBox>
              <span>월</span>
            </div>
            <div className={styles.date}>
              <SelectBox name="day">
                <option value="">일 선택</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </SelectBox>
              <span>일</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default PersonalSection;
