import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import {
  BackgroundColor,
  Color,
  TextStyle,
} from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../button/Button';
import Container from '../../../layout/container/Container';
import EditorToolbar from '../editor-toolbar/EditorToolbar';
import styles from './CommonEditor.module.scss';

function CommonEditor({ initTitle, initText, isAdmin = false, onSubmit }) {
  const [title, setTitle] = useState(initTitle || '');
  const [isNotice, setIsNotice] = useState(false);
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      TextStyle,
      Color.configure({ types: ['heading', 'paragraph', 'textStyle'] }),
      BackgroundColor.configure({
        types: ['heading', 'paragraph', 'textStyle'],
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'textStyle', 'image'],
      }),
      StarterKit.configure({
        bulletList: true,
        orderedList: true,
        paragraph: {
          keepMarks: true,
        },
      }),
      Image.configure({
        resize: true,
      }),
    ],
    content: initText || '<p>게시글을 작성하세요.</p>',
  });

  // 수정 모드
  useEffect(() => {
    if (editor && initText) {
      editor.commands.setContent(initText);
    }
  }, [editor, initText]);

  // 서버 전송
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editor) {
      return;
    }

    // 서버 전송용 html 코드
    const text = editor.getHTML();

    // 데이터 전달
    onSubmit({ title, text, isNotice });
  };

  return (
    <form className={styles.editorForm} onSubmit={handleSubmit}>
      <EditorToolbar editor={editor} />
      <div className={styles.container}>
        <Container>
          <span>[카테고리]</span>
          <input
            className={styles.title}
            type="text"
            placeholder="제목을 입력하세요."
            onChange={(e) => setTitle(e.target.value)}
          />
          <EditorContent className={styles.editor} editor={editor} />
        </Container>
      </div>
      <div className={styles.submit}>
        <Button type="submit" isRound={true}>
          완료
        </Button>
        <Button
          type="button"
          colors="gray"
          isRound={true}
          onClick={() => navigate(-1)}
        >
          취소
        </Button>
      </div>
    </form>
  );
}

export default CommonEditor;
