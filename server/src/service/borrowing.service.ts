import { getBorrowingByReaderDB, getTwoWeeksPassedDB, getTopTenBooks, findBorrowDB, getBorrowingDB, createBorrowingDB, findBookDB, findReaderDB, checkBookTaken, updateBookTaken, returnBorrowingDB, updateBookNotTaken } from '../repository/borrowing.repository';

export const getBorrowing = async () => {
    const bookinstances = await getBorrowingDB();
    return bookinstances;
};

export const getBorrowingByReader = async (reader_id: number) => {
    const borrowing = await getBorrowingByReaderDB(reader_id);
    return borrowing;
};

export const postBorrowBook = async (borrow: any): Promise<any> => {
    const book = await findBookDB(borrow.book_id);
    const reader = await findReaderDB(borrow.reader_id);
  
    if (book && reader) {
      const book_taken = await checkBookTaken(borrow.book_id);
  
      if (!book_taken) {
        const newBorrowing = createBorrowingDB(borrow);
        updateBookTaken(borrow.book_id);
        return newBorrowing;
      } else {
        throw "book not in library";
      }
    } else {
      throw "book or reader not exist";
    }
  };

export const postBorrowMany = async (borrows: any) => {
  const borrowedarray: any[] = [];
  const reader = await findReaderDB(borrows.reader_id);

  for (const book_id of borrows.book_ids) {
    try {
      const book = await findBookDB(book_id);

      if (book && reader) {
        const book_taken = await checkBookTaken(book_id);

        if (!book_taken) {
          const borrow = {
            book_id: book,
            reader_id: reader,
          };

          await updateBookTaken(book_id);
          const newBorrowing = await createBorrowingDB(borrow);
          borrowedarray.push(newBorrowing);
        } else {
          throw new Error(`book ${book_id} not in library.only added books until this one`);
        }
      } else {
        throw new Error("book or reader not exist");
      }
    } catch (err) {
      throw err + "";
    }
  }

  return borrowedarray;
};



export const postReturnBook = async (borrow: any) => {
    const returnbook = returnBorrowingDB(borrow.id);
    updateBookNotTaken((await returnbook).book_id.book_id);
    const book = findBorrowDB(borrow.id);
    return book;
  };
  

  export const postReturnManyBooks = async (return_books: any) => {
    const returnedarray: any[] = [];
  
    for (const borrow_id of return_books.borrow_ids) {
      try {
        const returnbook = await returnBorrowingDB(borrow_id);
        await updateBookNotTaken((returnbook).book_id.book_id);
        const book = await findBorrowDB(borrow_id);
        returnedarray.push(book);
      } catch (err) {
        throw err + "";
      }
    }
  
    return returnedarray;
  };

  export const toptenbooks = async () => {
    const topten = await getTopTenBooks();
    return topten;
  };
  
  export const twoweekspassed = async () => {
    const topten = await getTwoWeeksPassedDB();
    return topten;
  };
  