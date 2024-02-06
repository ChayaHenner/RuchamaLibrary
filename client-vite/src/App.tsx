import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Header from './comps/appBar';
import Home from './pages/homePage';
import Book from './books';
// import BookFormNew from './comps/bookFormNew';
import UserProfile from './pages/UserProfilePage';
import { ThemeProvider } from '@emotion/react';
import ExistingBook from './comps/existingBook';
import { theme } from './styles/styles';
import BooksPage from './pages/booksPage';
import BorrowPage from './pages/borrowPage';
import OverduePage from './pages/overduePage';
import TopTenPage from './pages/topTenPage';
import ReadersPage from './pages/readersPage';
import AddPublisherPage from './pages/addPublisherPage';
import AddBookPage from './pages/addBookPage';
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
          <Route path="/booksformnew" element={<AddBookPage />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="*" element={<h1>404 Error</h1>} />
      </Routes>
    </BrowserRouter>
      </ThemeProvider></>
  );
};

export default App;
