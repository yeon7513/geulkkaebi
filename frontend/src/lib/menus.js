export const gnb = [
  {
    label: '글깨비 소개',
    path: '/introduce',
  },
  {
    label: '신작·추천 도서',
    path: '/book',
  },
  {
    label: '이야기 놀이터',
    path: '/board',
  },
  {
    label: '깨비 퀴즈',
    path: '/quiz',
  },
  {
    label: '궁금해요',
    path: '/support',
  },
];

export const utils_noLogin = [
  {
    label: '로그인',
    path: '/login',
  },
  {
    label: '회원가입',
    path: '/join',
  },
];

export const utils_logined = [
  {
    label: '마이페이지',
    path: '/mypage',
  },
  {
    label: '로그아웃',
    path: '/',
  },
];

export const utils_manager = [
  {
    label: '관리',
    path: '/manager',
  },
  {
    label: '로그아웃',
    path: '/',
  },
];

export const board = [
  {
    label: '오늘의 인기글',
    path: '/board/popular',
    color: 'yellow',
    comp: 'PopularPosts',
  },
  {
    label: '토론마당',
    path: '/board/debate',
    color: 'green',
    comp: 'Debate',
  },
  {
    label: '스토리+',
    path: '/board/story',
    color: 'purple',
    comp: 'Story',
  },
  {
    label: '도서 기자단',
    path: '/board/article',
    color: 'orange',
    comp: 'Article',
  },
];

export const quiz = [
  {
    label: '단어 탐험대',
    path: '/quiz/word',
    color: 'green',
    comp: 'Word',
  },
  {
    label: '속담 마법사',
    path: '/quiz/proverb',
    color: 'purple',
    comp: 'Proverb',
  },
];

export const book = [
  {
    label: '신작도서',
    path: '/book/newest',
    color: 'yellow',
    comp: 'BookNewest',
  },
  {
    label: '추천도서',
    path: '/book/best',
    color: 'orange',
    comp: 'BookBest',
  },
];

export const support = [
  {
    label: '공지사항',
    path: '/support/notice',
    color: 'green',
    comp: 'Notice',
  },
  {
    label: '자주 묻는 질문',
    path: '/support/faq',
    color: 'orange',
    comp: 'Faq',
  },
  {
    label: '고객센터',
    path: '/support/contact',
    color: 'mint',
    comp: 'Contact',
  },
];

export const footer = [
  { label: '공지사항', path: '/support/notice' },
  { label: '자주 묻는 질문', path: '/support/faq' },
  { label: '이용약관', path: '/support/faq' },
  { label: '개인정보처리방침', path: '/support/faq' },
];

export const manager = [
  {
    path: '/manager',
    label: '통계',
    comp: 'Statistics',
  },
  {
    path: '/manager/member',
    label: '회원 관리',
    comp: 'MemberManagement',
  },
  {
    path: '/manager/board',
    label: '게시판 관리',
    comp: 'BoardManagement',
  },
  {
    path: '/manager/quiz',
    label: '퀴즈 관리',
    comp: 'QuizManagement',
  },
];

export const member = [
  {
    path: '/mypage/information',
    label: '내 정보',
    comp: 'MemberInformation',
  },
  {
    path: '/mypage/update',
    label: '정보 수정',
    comp: 'UpdateInfo',
  },
  {
    path: '/mypage/cancel',
    label: '회원 탈퇴',
    comp: 'CancelMembership',
  },
];
