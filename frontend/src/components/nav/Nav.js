import { Link } from 'react-router-dom';
import { useComponentContext } from '../../context/ComponentProvider';
import styles from './Nav.module.scss';

function NavLink({ className, path, comp, children }) {
  const { setCurrComp } = useComponentContext();

  const handleToMove = (comp) => {
    setCurrComp(comp);
  };

  return (
    <li className={className}>
      <Link to={path} onClick={() => handleToMove(comp)}>
        {children}
      </Link>
    </li>
  );
}

function Nav({ menus }) {
  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.gnb}>
          {menus.map((menu, idx) => (
            <NavLink
              key={idx}
              path={menu.path}
              depth={menu.depth}
              className={styles.item}
            >
              {menu.label}
            </NavLink>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Nav;
