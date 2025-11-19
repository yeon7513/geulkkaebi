import { Link } from 'react-router-dom';
import styles from './Nav.module.scss';

export function NavLink({ className, path, comp, children }) {
  return (
    <li className={className}>
      <Link to={path}>{children}</Link>
    </li>
  );
}

export function Nav({ menus, className }) {
  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.gnb}>
          {menus.map((menu, idx) => (
            <NavLink key={idx} path={menu.path} className={className}>
              {menu.label}
            </NavLink>
          ))}
        </ul>
      </nav>
    </>
  );
}
