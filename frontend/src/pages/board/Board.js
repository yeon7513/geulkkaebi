import SubPageLayout from '../../components/layout/sub-page-layout/SubPageLayout';
import { useComponentContext } from '../../context/ComponentProvider';
import { board } from '../../lib/menus';

function Board() {
  const { currComp } = useComponentContext();

  console.log(currComp);

  return (
    <div>
      <SubPageLayout compData={board} />
    </div>
  );
}

export default Board;
