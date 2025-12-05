import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import {
  BackgroundColor,
  Color,
  TextStyle,
} from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../button/Button';
import Container from '../../../layout/container/Container';
import Tooltip from '../../../tooltip/Tooltip';
import EditorToolbar from '../editor-toolbar/EditorToolbar';
import CheckBox from './../../../input/check-box/CheckBox';
import styles from './CommonEditor.module.scss';

const categories = [
  { value: 'notice', label: '공지사항', adminOnly: true },
  { value: 'event', label: '이벤트', adminOnly: true },
  { value: 'faq', label: '자주 묻는 질문', adminOnly: true },
  { value: 'debate', label: '토론마당' },
  { value: 'story', label: '스토리+' },
  { value: 'article', label: '도서 기자단' },
];

function CommonEditor({ initTitle, initText, onSubmit }) {
  const { loginedUser } = useSelector((state) => state.userSlice);
  const [title, setTitle] = useState(initTitle || '');
  const [noticeYn, setNoticeYn] = useState(0);

  const isAdmin = loginedUser.adminYn === 1;

  // 카테고리 선택
  const location = useLocation();
  const defaultType = location.state?.boardType || '';
  const [boardType, setBoardType] = useState(defaultType);

  // 필수 입력 값 경고
  const titleRef = useRef();
  const boardTypeRef = useRef();
  const textRef = useRef();
  const [alert, setAlert] = useState({
    requireValue: null,
    msg: '',
  });

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

    // 본문 텍스트 검열
    const text = editor.getText().trim();

    // 필수값 체크
    if (!title.trim()) {
      setAlert({
        requireValue: 'title',
        msg: '제목을 입력해주세요.',
      });
      titleRef.current?.focus();
      return;
    }

    if (!boardType) {
      setAlert({
        requireValue: 'boardType',
        msg: '카테고리를 선택해주세요.',
      });
      boardType.current?.focus();
      return;
    }

    if (!text) {
      setAlert({
        requireValue: 'text',
        msg: '게시글을 작성해주세요.',
      });
      editor.commands.focus();
      return;
    }

    // 필수값 체크 끝나면 tooltip 비활성화
    setAlert({ requireValue: null, msg: '' });

    const postData = {
      title,
      text: editor.getHTML(), // 서버 전송용 html 코드
      boardType,
      noticeYn: isAdmin ? noticeYn : 0,
    };

    // 데이터 전달
    onSubmit(postData);
  };

  return (
    <form className={styles.editorForm} onSubmit={handleSubmit}>
      <EditorToolbar editor={editor} />
      <div className={styles.container}>
        <Container>
          <div className={styles.header}>
            <Tooltip
              text={alert.requireValue === 'boardType' ? alert.msg : ''}
              position="right"
              show={!boardType}
            >
              <div />
            </Tooltip>
            <div className={styles.selectCategory}>
              <select
                name="boardType"
                id="boardType"
                ref={boardTypeRef}
                value={boardType}
                onChange={(e) => setBoardType(e.target.value)}
              >
                <option value="">카테고리 선택</option>
                {categories
                  // 일반회원이면 adminOnly 카테고리 제거
                  .filter((cat) => !(cat.adminOnly && !isAdmin))
                  .map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
              </select>
            </div>
            {isAdmin && (
              <div>
                <CheckBox
                  label="공지로 등록"
                  id="noticeYn"
                  name="noticeYn"
                  checked={noticeYn}
                  onChange={(e) => setNoticeYn(e.target.checked ? 1 : 0)}
                />
              </div>
            )}
          </div>
          <div className={styles.titleWarp}>
            <Tooltip
              text={alert.requireValue === 'title' ? alert.msg : ''}
              position="top"
              show={!title.trim()}
            >
              <div />
            </Tooltip>
            <input
              className={styles.title}
              id="title"
              name="title"
              type="text"
              ref={titleRef}
              placeholder="제목을 입력하세요."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.editorWrap}>
            <Tooltip
              text={alert.requireValue === 'text' ? alert.msg : ''}
              position="top"
              show={editor.getText().trim() === ''}
            >
              <div />
            </Tooltip>
            <EditorContent
              className={styles.editor}
              editor={editor}
              ref={textRef}
            />
          </div>
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
