import CancelMembership from '../pages/member/cancel-membership/CancelMembership';
import MemberInformation from '../pages/member/member-information/MemberInformation';
import UpdateInfo from '../pages/member/member-information/update-info/UpdateInfo';
import { useComponentContext } from './ComponentProvider';

function MemberCategory() {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case 'MemberInformation':
      return <MemberInformation />;
    case 'UpdateInfo':
      return <UpdateInfo />;
    case 'CancelMembership':
      return <CancelMembership />;
    default:
      return <MemberInformation />;
  }
}

export default MemberCategory;
