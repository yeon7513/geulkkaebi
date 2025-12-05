import styles from './ControlButton.module.scss';

function ControlButton({ isLogin, isWriter, onUpdate, onDelete }) {
  if (!isLogin) {
    return;
  }

  return (
    <ul className={styles.wrap}>
      {isWriter ? (
        <>
          <li>
            <button>수정</button>
          </li>
          <li>
            <button>삭제</button>
          </li>
        </>
      ) : (
        <li>
          <button>신고</button>
        </li>
      )}
    </ul>
  );
}

export default ControlButton;
