import { Outlet, useNavigate } from 'react-router-dom';
import { useComponentContext } from '../../../context/ComponentProvider';
import Button from '../../button/Button';
import Container from '../container/Container';
import styles from './SubPageLayout.module.scss';

function SubPageLayout({ compData }) {
  const { currComp, setCurrComp } = useComponentContext();
  const navigate = useNavigate();

  const handleChangeComponents = (comp, path) => {
    setCurrComp(comp);
    navigate(path);
  };

  console.log(currComp);

  return (
    <section className={styles.wrap}>
      <div className={styles.pageTitle}>
        {compData.map((menu, idx) => (
          <Button
            key={idx}
            variant="pushable"
            colors={menu.color || 'green'}
            onClick={() => handleChangeComponents(menu.comp, menu.path)}
          >
            {menu.label}
          </Button>
        ))}
      </div>
      <Container>
        <Outlet />
      </Container>
    </section>
  );
}

export default SubPageLayout;
