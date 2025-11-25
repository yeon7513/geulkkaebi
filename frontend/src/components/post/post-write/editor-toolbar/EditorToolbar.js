import { useEffect, useRef, useState } from 'react';
import styles from './EditorToolbar.module.scss';
import ColorPalette from './tool-items/ColorPalette';
import PostImageUpload from './tool-items/PostImageUpload';
import ToolbarGroup from './tool-items/ToolbarGroup';
import {
  alignItems,
  colorItems,
  decoItems,
  listItems,
} from './tool-items/toolbarItemsData';

function EditorToolbar({ editor }) {
  const [isPaletteShow, setIsPaletteShow] = useState(true);
  const paletteRef = useRef(null);

  const handleTogglePalette = () => {
    setIsPaletteShow(!isPaletteShow);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target)) {
        setIsPaletteShow(false);
      }
    };

    if (isPaletteShow) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPaletteShow]);

  return (
    <div className={styles.wrap}>
      <div className={styles.editorToolbar}>
        {/* 굵기, 기울이기, 밑줄, 취소선 */}
        <ToolbarGroup toolItems={decoItems(editor)} />
        {/* 색상 팔레트 */}
        <div className={styles.colorTool}>
          <button type="button" onClick={handleTogglePalette}>
            colors change
          </button>
          {isPaletteShow && (
            <div ref={paletteRef} className={styles.palette}>
              {colorItems(editor).map((item, idx) => (
                <ColorPalette
                  key={idx}
                  colors={item.colors}
                  type={item.type}
                  onSet={item.action}
                  onUnset={item.unSet}
                />
              ))}
            </div>
          )}
        </div>
        {/* 문단 정렬 */}
        <ToolbarGroup toolItems={alignItems(editor)} />
        {/* 리스트 */}
        <ToolbarGroup toolItems={listItems(editor)} />
        {/* 이미지 */}
        <PostImageUpload editor={editor} />
      </div>
    </div>
  );
}

export default EditorToolbar;
