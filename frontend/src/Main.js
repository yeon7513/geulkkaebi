import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PageLayout from './components/layout/pageLayout/PageLayout';
import { ComponentProvider } from './context/ComponentProvider';
import { board, book, quiz, support } from './lib/menus';
import Article from './pages/board/article/Article';
import Debate from './pages/board/debate/Debate';
import Story from './pages/board/story/Story';
import BookBest from './pages/books/book-best/BookBest';
import BookNewest from './pages/books/book-newest/BookNewest';
import Home from './pages/home/Home';
import Introduce from './pages/introduce/Introduce';
import Manager from './pages/manager/Manager';
import NotFound404 from './pages/not-found/NotFound404';
import Contact from './pages/notice/contact/Contact';
import Notice from './pages/notice/Notice';
import Proverb from './pages/quiz/proverb/Proverb';
import Word from './pages/quiz/word/Word';
import Join from './pages/sign/join/Join';
import Login from './pages/sign/login/Login';
import Sign from './pages/sign/Sign';
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
            {/* 신작도서 및 추천도서 */}
            <Route path="/book" element={<PageLayout submenu={book} />}>
              <Route index element={<Navigate to="newest" replace />} />
              <Route path="newest" element={<BookNewest />} />
              <Route path="best" element={<BookBest />} />
            </Route>
            {/* 퀴즈 */}
            <Route path="/quiz" element={<PageLayout submenu={quiz} />}>
              <Route index element={<Navigate to="word" replace />} />
              <Route path="word" element={<Word />} />
              <Route path="proverb" element={<Proverb />} />
            </Route>
            {/* 게시판 */}
            <Route path="/board" element={<PageLayout submenu={board} />}>
              <Route index element={<Navigate to="debate" replace />} />
              <Route path="debate" element={<Debate />} />
              <Route path="story" element={<Story />} />
              <Route path="article" element={<Article />} />
            </Route>
            {/* 고객센터 */}
            <Route path="/support" element={<PageLayout submenu={support} />}>
              <Route index element={<Navigate to="notice" replace />} />
              <Route path="notice" element={<Notice />} />
              <Route path="faq" element={<Notice />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            {/* 관리자페이지 */}
            <Route path="manager" element={<Manager />} />
          </Route>
          {/* 로그인 및 회원가입 */}
          <Route path="/sign" element={<Sign />}>
            <Route index path="login" element={<Login />} />
            <Route path="join" element={<Join />} />
          </Route>
          {/* 404페이지 */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </ComponentProvider>
    </BrowserRouter>
  );
}

export default Main;
