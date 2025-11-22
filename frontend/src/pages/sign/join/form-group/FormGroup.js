import styles from '../Join.module.scss';

function FormGroup({ title, children }) {
  return (
    <div className={styles.formGroup}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default FormGroup;
