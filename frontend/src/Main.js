import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PostListItem from './components/post/post-list/post-list-item/PostListItem';
import PostWrite from './components/post/post-write/PostWrite';
import { ComponentProvider } from './context/ComponentProvider';
import AllPost from './pages/board/all-post/AllPost';
import Article from './pages/board/article/Article';
import Board from './pages/board/Board';
import Debate from './pages/board/debate/Debate';
import Story from './pages/board/story/Story';
import Book from './pages/books/Book';
import BookDetail from './pages/books/book-detail/BookDetail';
import Home from './pages/home/Home';
import Introduce from './pages/introduce/Introduce';
import BoardManagement from './pages/manager/board-management/BoardManagement';
import Manager from './pages/manager/Manager';
import MemberManagement from './pages/manager/member-management/MemberManagement';
import QuizManagement from './pages/manager/quiz-management/QuizManagement';
import Statistics from './pages/manager/statistics/Statistics';
import CancelMembership from './pages/member/cancel-membership/CancelMembership';
import Member from './pages/member/Member';
import MemberInformation from './pages/member/member-information/MemberInformation';
import UpdateInfo from './pages/member/update-info/UpdateInfo';
import NotFound404 from './pages/not-found/NotFound404';
import Quiz from './pages/quiz/Quiz';
import QuizIntro from './pages/quiz/quiz-intro/QuizIntro';
import QuizPlay from './pages/quiz/quiz-play/QuizPlay';
import FindIdPw from './pages/sign/find-id-pw/FindIdPw';
import Join from './pages/sign/join/Join';
import Login from './pages/sign/login/Login';
import Sign from './pages/sign/Sign';
import Contact from './pages/support/contact/Contact';
import Event from './pages/support/event/Event';
import Faq from './pages/support/faq/Faq';
import Notice from './pages/support/notice/Notice';
import Support from './pages/support/Support';
import './scss/global.scss';

function Main() {
  return (
    <BrowserRouter>
      <ComponentProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* 메인 */}
            <Route index element={<Home />} />
            {/* 소개 */}
            <Route path="introduce" element={<Introduce />} />
            {/* 도서 검색 */}
            <Route path="/book" element={<Book />} />
            <Route path="/book/detail/:isbn" element={<BookDetail />} />
            {/* 퀴즈 */}
            <Route path="/quiz" element={<Quiz />}>
              <Route index element={<QuizIntro />} />
              <Route path="word" element={<QuizPlay quizType="word" />} />
              <Route path="proverb" element={<QuizPlay quizType="proverb" />} />
            </Route>
            {/* 게시판 */}
            <Route path="/board" element={<Board />}>
              <Route path="all" element={<AllPost />} />
              <Route path="debate" element={<Debate />} />
              <Route path="story" element={<Story />} />
              <Route path="article" element={<Article />} />
              {/* 게시글 상세 조회 */}
              <Route path=":boardType/:postNo" element={<PostListItem />} />
            </Route>
            {/* 고객센터 */}
            <Route path="/support" element={<Support />}>
              <Route index element={<Navigate to="notice" replace />} />
              <Route path="notice" element={<Notice />} />
              <Route path="event" element={<Event />} />
              <Route path="faq" element={<Faq />} />
              <Route path="contact" element={<Contact />} />
              <Route path=":boardType/:postNo" element={<PostListItem />} />
            </Route>
            {/* 회원 - 마이페이지 */}
            <Route path="/mypage" element={<Member />}>
              <Route index element={<MemberInformation />} />
              <Route path="update" element={<UpdateInfo />} />
              <Route path="cancel" element={<CancelMembership />} />
            </Route>
            {/* 관리자 - 마이페이지 */}
            <Route path="manager" element={<Manager />}>
              <Route index element={<Statistics />} />
              <Route path="member" element={<MemberManagement />} />
              <Route path="board" element={<BoardManagement />} />
              <Route path="quiz" element={<QuizManagement />} />
            </Route>
          </Route>
          {/* 로그인 및 회원가입 */}
          <Route path="/sign" element={<Sign />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="join" element={<Join />} />
            <Route path="find" element={<FindIdPw />} />
          </Route>
          {/* 공통 에디터 - 글쓰기 / 수정 페이지 */}
          <Route path="/write" element={<PostWrite />} />
          <Route path="/edit/:boardType/:postNo" element={<PostWrite />} />
          {/* 404페이지 */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </ComponentProvider>
    </BrowserRouter>
  );
}

export default Main;
