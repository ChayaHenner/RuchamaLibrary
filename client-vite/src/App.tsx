import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Header from './header';
import Home from './home';
import Readers from './readers';
import Book from './books';
import BookFormNew from './bookFormNew';
import AddReader from './addReader';
import Borrow from './borrow';
import TopTen from './topten';
import CollapsibleTable from './booksOverdue';
import UserProfile from './userProfile';
import BooksLibrary from './booksLibrary';
import { ThemeProvider } from '@emotion/react';
import ExistingBook from './existingBook';
import { theme } from './styles';
import AddPublisher from './addPublisher';
const App = () => {
  
  return (<>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header />
      <Routes>
      <Route index element={<Home />} />
          <Route path="/readers" element={<Readers />} />
          <Route path="/books" element={<Book />} />
          <Route path="/bookslibrary" element={<BooksLibrary />} />
          <Route path="/addexistingbook" element={<ExistingBook />} />
          <Route path="/addreader" element={<AddReader />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/topten" element={<TopTen />} />
          <Route path="/addpublisher" element={<AddPublisher />} />
          <Route path="/overdue" element={<CollapsibleTable />} />
          <Route path="/booksformnew" element={<BookFormNew />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="*" element={<h1>404 Error</h1>} />
      </Routes>
    </BrowserRouter>
      </ThemeProvider></>
  );
};

export default App;
