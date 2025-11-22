import SubPageLayout from '../../components/layout/sub-page-layout/SubPageLayout';
import { board } from '../../lib/menus';

function Board() {
  return (
    <>
      <SubPageLayout compData={board} />
    </>
  );
}

export default Board;
