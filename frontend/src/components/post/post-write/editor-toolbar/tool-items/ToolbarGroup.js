import cn from 'classnames';
import styles from './tool-items.module.scss';

function ToolbarGroup({ className, toolItems }) {
  return (
    <div className={cn(styles.tools, className)}>
      {toolItems.map((item, idx) => (
        <button
          key={idx}
          className={styles.icon}
          type="button"
          onClick={item.action}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default ToolbarGroup;
