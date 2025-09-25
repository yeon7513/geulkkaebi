import { Link, Outlet } from 'react-router-dom';
import Container from '../../components/layout/container/Container';

function Sign(props) {
  return (
    <div>
      <header>
        <Link to="/">logo</Link>
      </header>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default Sign;
