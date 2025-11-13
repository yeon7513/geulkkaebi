import SubPageLayout from '../../components/layout/sub-page-layout/SubPageLayout';
import { book } from './../../lib/menus';
import styles from './Book.module.scss';

function Book() {
  return (
    <div className={styles.book}>
      <SubPageLayout compData={book} />
    </div>
  );
}

export default Book;
