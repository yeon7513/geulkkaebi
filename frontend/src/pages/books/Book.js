import { Outlet } from 'react-router-dom';
import { Nav } from '../../components/layout/nav/Nav';
import { book } from '../../lib/menus';

function Book() {
  console.log(book);
  return (
    <div>
      <Nav menus={book} />
      <h3>Book</h3>
      <Outlet />
    </div>
  );
}

export default Book;
