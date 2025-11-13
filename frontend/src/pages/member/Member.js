import MyPageLayout from '../../components/layout/my-page-layout/MyPageLayout';
import { member } from '../../lib/menus';

function Member() {
  return (
    <div>
      <MyPageLayout compData={member} />
    </div>
  );
}

export default Member;
