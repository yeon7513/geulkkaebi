import { Outlet } from 'react-router-dom';
import Container from '../container/Container';
import { Nav } from '../nav/Nav';

function PageLayout({ submenu }) {
  return (
    <Container>
      <Nav menus={submenu} />
      <Outlet />
    </Container>
  );
}

export default PageLayout;
