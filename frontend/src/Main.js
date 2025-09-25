import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ComponentProvider } from './context/ComponentProvider';
import Article from './pages/board/article/Article';
import Board from './pages/board/Board';
import Debate from './pages/board/debate/Debate';
import Notice from './pages/board/notice/Notice';
import Story from './pages/board/story/Story';
import Book from './pages/books/Book';
import BookBest from './pages/books/book-best/BookBest';
import BookNewest from './pages/books/book-newest/BookNewest';
import Contact from './pages/contact/Contact';
import Home from './pages/home/Home';
import Introduce from './pages/introduce/Introduce';
import Manager from './pages/manager/Manager';
import NotFound404 from './pages/not-found/NotFound404';
import Proverb from './pages/quiz/proverb/Proverb';
import Quiz from './pages/quiz/Quiz';
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
            <Route index element={<Home />} />
            <Route path="introduce" element={<Introduce />} />
            <Route path="/book" element={<Book />}>
              <Route index path="newest" element={<BookNewest />} />
              <Route path="best" element={<BookBest />} />
            </Route>
            <Route path="manager" element={<Manager />} />
            <Route path="/quiz" element={<Quiz />}>
              <Route path="word" element={<Word />} />
              <Route path="proverb" element={<Proverb />} />
            </Route>
            <Route path="/board" element={<Board />}>
              <Route index path="notice" element={<Notice />} />
              <Route path="debate" element={<Debate />} />
              <Route path="story" element={<Story />} />
              <Route path="article" element={<Article />} />
            </Route>
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="/sign" element={<Sign />}>
            <Route index path="login" element={<Login />} />
            <Route path="join" element={<Join />} />
          </Route>
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </ComponentProvider>
    </BrowserRouter>
  );
}

export default Main;
