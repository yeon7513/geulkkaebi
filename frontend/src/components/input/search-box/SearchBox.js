import cn from 'classnames';
import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import styles from './SearchBox.module.scss';

function SearchBox({ className, keyword, onSearch }) {
  const [text, setText] = useState(keyword);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim() !== '') {
      onSearch(text);
    }
  };

  return (
    <div className={cn(className, styles.searchBox)}>
      <input
        type="text"
        className={styles.searchBar}
        placeholder="책 이름을 입력하세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      <button className={styles.searchBtn}>
        <BiSearchAlt />
      </button>
    </div>
  );
}

export default SearchBox;
