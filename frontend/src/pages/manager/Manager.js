import MyPageLayout from '../../components/layout/my-page-layout/MyPageLayout';
import { manager } from '../../lib/menus';

function Manager() {
  return (
    <div>
      <MyPageLayout compData={manager} />
    </div>
  );
}

export default Manager;
