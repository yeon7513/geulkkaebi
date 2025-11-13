import { Outlet, useNavigate } from 'react-router-dom';
import { useComponentContext } from '../../../context/ComponentProvider';
import styles from './MyPageLayout.module.scss';

function MyPageLayout({ compData }) {
  const { setCurrComp } = useComponentContext();
  const navigate = useNavigate();

  const handleChangeComponents = (comp, path) => {
    setCurrComp(comp);
    navigate(path);
  };

  return (
    <div className={styles.wrap}>
      <ul className={styles.sideNav}>
        {compData.map((menu, idx) => (
          <li key={idx}>
            <button
              onClick={() => handleChangeComponents(menu.comp, menu.path)}
            >
              {menu.label}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
}

export default MyPageLayout;
