import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Header from './header';
import Home from './home';
import Readers from './comps/readers';
import Book from './books';
import BookFormNew from './comps/bookFormNew';
import AddReader from './comps/addReader';
import UserProfile from './userProfile';
import { ThemeProvider } from '@emotion/react';
import ExistingBook from './comps/existingBook';
import { theme } from './styles/styles';
import AddPublisher from './comps/addPublisher';
import BooksPage from './pages/booksPage';
import BorrowPage from './pages/borrowPage';
import OverduePage from './pages/overduePage';
import TopTenPage from './pages/topTenPage';
import ReadersPage from './pages/readersPage';
import AddPublisherPage from './pages/addPublisherPage';
const App = () => {
  
  return (<>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header />
      <Routes>
      <Route index element={<Home />} />
          <Route path="/readers" element={<ReadersPage />} />
          <Route path="/books" element={<Book />} />
          <Route path="/bookslibrary" element={<BooksPage />} />
          <Route path="/addexistingbook" element={<ExistingBook />} />
          {/* <Route path="/addreader" element={<AddReader />} /> */}
          <Route path="/borrow" element={<BorrowPage />} />
          <Route path="/topten" element={<TopTenPage />} />
          <Route path="/addpublisher" element={<AddPublisherPage />} />
          <Route path="/overdue" element={<OverduePage />} />
          <Route path="/booksformnew" element={<BookFormNew />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="*" element={<h1>404 Error</h1>} />
      </Routes>
    </BrowserRouter>
      </ThemeProvider></>
  );
};

export default App;
