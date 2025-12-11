import styles from './ControlButton.module.scss';

function ControlButton({
  isEdit = false,
  isLogin,
  isWriter,
  onEdit,
  onDelete,
}) {
  if ((!isLogin && !isWriter) || isEdit) {
    return;
  }

  return (
    <ul className={styles.wrap}>
      {isWriter ? (
        <>
          <li>
            <button onClick={onEdit}>수정</button>
          </li>
          <li>
            <button onClick={onDelete}>삭제</button>
          </li>
        </>
      ) : (
        (isLogin || !isWriter) && (
          <li>
            <button>신고</button>
          </li>
        )
      )}
    </ul>
  );
}

export default ControlButton;
