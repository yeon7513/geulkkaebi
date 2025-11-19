import Image from '@tiptap/extension-image';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';

function CommonEditor({ initTitle, initContent, isAdmin = false, onSubmit }) {
  const [title, setTitle] = useState(initTitle || '');
  const [isNotice, setIsNotice] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: initContent || '<p>게시글을 작성하세요.</p>',
  });

  // 수정 모드
  useEffect(() => {
    if (editor && initContent) {
      editor.commands.setContent(initContent);
    }
  }, [editor, initContent]);

  // 이미지 업로드 핸들러
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editor) {
      return;
    }

    // 서버 전송용 html 코드
    const content = editor.getHTML();
    console.log(content);

    // 데이터 전달
    onSubmit({ title, content, isNotice });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="제목을 입력하세요." />
      <EditorContent editor={editor} />
      <button type="submit">등록</button>
    </form>
  );
}

export default CommonEditor;
