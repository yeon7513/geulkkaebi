import Contact from '../pages/support/contact/Contact';
import Faq from '../pages/support/faq/Faq';
import Notice from '../pages/support/notice/Notice';
import { useComponentContext } from './ComponentProvider';

function SupportCategory() {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case 'Notice':
      return <Notice />;
    case 'Faq':
      return <Faq />;
    case 'Contact':
      return <Contact />;
    default:
      return <Notice />;
  }
}

export default SupportCategory;
