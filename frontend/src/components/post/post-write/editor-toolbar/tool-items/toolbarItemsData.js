import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaListOl,
  FaStrikethrough,
  FaUnderline,
} from 'react-icons/fa';
import { FaListUl } from 'react-icons/fa6';

export const decoItems = (editor) => [
  {
    label: <FaBold />,
    action: () => editor.chain().focus().toggleBold().run(),
  },
  {
    label: <FaItalic />,
    action: () => editor.chain().focus().toggleItalic().run(),
  },
  {
    label: <FaUnderline />,
    action: () => editor.chain().focus().toggleUnderline().run(),
  },
  {
    label: <FaStrikethrough />,
    action: () => editor.chain().focus().toggleStrike().run(),
  },
];

export const colorItems = (editor) => [
  {
    action: (color) => {
      editor.chain().focus().setColor(color).run();
    },
    colors: COLORS_TEXT,
    type: 'text',
    unSet: () => {
      editor.chain().focus().unsetColor().run();
    },
  },
  {
    action: (color) => {
      editor.chain().focus().setBackgroundColor(color).run();
    },
    colors: COLORS_BG,
    type: 'bg',
    unSet: () => {
      editor.chain().focus().unsetBackgroundColor().run();
    },
  },
];

export const alignItems = (editor) => [
  {
    label: <FaAlignLeft />,
    action: () => editor.chain().focus().setTextAlign('left').run(),
  },
  {
    label: <FaAlignCenter />,
    action: () => editor.chain().focus().setTextAlign('center').run(),
  },
  {
    label: <FaAlignRight />,
    action: () => editor.chain().focus().setTextAlign('right').run(),
  },
];

export const listItems = (editor) => [
  {
    label: <FaListUl />,
    action: () => editor.chain().focus().toggleBulletList().run(),
  },
  {
    label: <FaListOl />,
    action: () => editor.chain().focus().toggleOrderedList().run(),
  },
];

// 컬러 팔레트
export const COLORS_TEXT = [
  '#e03131',
  '#f08c00',
  '#ffd43b',
  '#2f9e44',
  '#339af0',
  '#9c36b5',
  '#f783ac',
  '#ced4da',
  '#fff',
];
export const COLORS_BG = [
  '#ff8787',
  '#ff922b',
  '#ffec99',
  '#8ce99a',
  '#d0ebff',
  '#eebefa',
  '#ffdeeb',
  '#dee2e6',
  '#000',
];
