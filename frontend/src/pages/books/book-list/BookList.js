import cn from 'classnames';
import styles from './BookList.module.scss';

function BookList({ list, className }) {
  return (
    <ul className={cn(styles.list, className)}>
      {list.map((item, idx) => (
        <li key={idx}>
          <img src={item.cover} alt={`${item.title} 표지`} />
          <div className={styles.info}>
            <h4>{item.title}</h4>
            <span>{item.publisher}</span>
            <p>{item.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
