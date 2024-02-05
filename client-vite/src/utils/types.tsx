export type Publisher = {
    publisher_id: number | undefined ;
    publisher_name: string;
  }
  
  export  type BookFormProps =  {
    book_name: string;
    author: string;
    publisher_id?: number | undefined; ///
    amount: number;
    category: string;
    price: number;
  }

  export type ReaderForm = {
    name: string;
    email: string;
    dob: Date ;//| null ; 
  }

  export  interface Book {
    book_id: string;
    book_code: string;
    book_taken: string;
  }

  export type BookReturn = {
    book_id: number;
    borrowing_id: number;
    book_instance: {
      price: number;
      author: string;
      category: string;
      book_code: number;
      book_name: string;
      publisher_id: number;
    };
    date_borrowed: string;
    date_returned: string | null;
  }

  type PublisherType = {
    publisher_id: number;
    publisher_name: string;
    country: string;
    date_deleted: string | null;
  };
  
  type BookCode = {
    book_code: number;
    book_name: string;
    author: string;
    price: number;
    category: string;
    publisher_id: PublisherType;
  };
  
  export type BookType = {
    book_id: number;
    book_taken: boolean;
    book_code: BookCode;
  };
  
  export type Reader = {
    reader_id: number;
    name: string;
    email: string;
    dob: string;
    date_deleted: string | null;
  };
  
  export type BorrowedBook = {
    reader_id: Reader;
    book_id: BookType;
    date_returned: string | null;
    id: number;
    date_borrowed: string;
  };

  export type BookLibrary = {
    book_book_code: number;
    bookinstance_book_name: string;
    bookinstance_author: string;
    bookinstance_category: string;
    bookinstance_publisher_id: number;
    books: Array<{
      book_id: number;
      book_taken: boolean;
    }>;
    total_book_ids: number;
    not_taken_count: number;
  };
  
  export type CustomCardProps = {
    inLib: boolean;
    categoryColor: string;
  };

  export type BookInstance= {
    book_code: number,
    book_name: string,
    author: string,
    price: number,
    category: string,
    publisher_id:PublisherType
    }

   export type BorrowBookInstance = {
      book_id: number;
      borrowing_id: number;
      book_instance: {
        price: number;
        author: string;
        category: string;
        book_code: number;
        book_name: string;
        publisher_id: number;
      };
      date_borrowed: string;
      date_returned: string | null;
    };
    
   export type ReaderWithUnreturnedBooks = {
      reader_reader_id: number;
      reader_name: string;
      reader_email: string;
      unreturned_books: BorrowBookInstance[];
    };

    export type RowProps={
      row:ReaderWithUnreturnedBooks
    }

    export type BorrowBooks = {
      reader_id?:number | null | undefined,
      book_ids:number[]
    }
    
export type NewBookConfirmProps = {
  data: BorrowedBook[];
}
export type ExistingBookFormValues = {
    book_code?: number | undefined;
    amount: number;
};

type BookInfo = {
  book_name: string;
  author: string;
  price: number;
  category: string;
  publisher_id: number |PublisherType;
  book_code: number;
};

type BookItem = {
  book_code: number;
  book_id: number;
  book_taken: boolean;
};

export type BookResponse = {
  books: BookItem[];
  book_info: BookInfo;
};


export type ReaderInfo = {
  reader_reader_id: number;
  reader_name: string;
  reader_email: string;
  toreturn: BorrowBookInstance[];
  history: BorrowBookInstance[];
};
export type ReturnTableProps ={
  toReturn: BookReturn[] ;
}
export type HistoryTableProps ={
  history: BookReturn[] ;
}

export type NewBookConfirmProp =  {
  data: BookResponse | undefined;
}
// type BorrowedBook = {
//   book_id: number;
//   borrowing_id: number;
//   book_instance: BookInstance;
//   date_borrowed: string;
//   date_returned?: string; // Date returned is optional as it might not be present in "toreturn" array
// };

export type PublisherForm =  {
  publisher_name: string;
  country: string;
}
export type BookCardProp =  {
  book: BookLibrary ;
}
export type ReaderCardProp =  {
  reader: Reader ;
}
export type AddReaderProps =  {
  onClose: () => void;
}