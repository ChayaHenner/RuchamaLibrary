export type Publisher = {
    id: number | undefined ;
    name: string;
  }
  
  export  type BookFormProps =  {
    name: string;
    author: string;
    publisher?: number | undefined; ///
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
    id: string;
    bookCode: string;
    book_taken: string;
  }

  export type BookReturn = {
    id: number;
    borrowing_id: number;
    book_instance: {
      price: number;
      author: string;
      category: string;
      bookCode: number;
      name: string;
      publisher: number;
    };
    date_borrowed: string;
    date_returned: string | null;
  }

  type PublisherType = {
    id: number;
    name: string;
    country: string;
    date_deleted: string | null;
  };
  
  type BookCode = {
    bookCode: number;
    name: string;
    author: string;
    price: number;
    category: string;
    publisher: PublisherType;
  };
  
  export type BookType = {
    id: number;
    book_taken: boolean;
    bookCode: BookCode;
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
    book: BookType;
    date_returned: string | null;
    id: number;
    date_borrowed: string;
  };

  export type BookLibrary = {
    book_bookCode: number;
    bookinstance_name: string;
    bookinstance_author: string;
    bookinstance_category: string;
    bookinstance_publisher: number;
    books: Array<{
      id: number;
      book_taken: boolean;
    }>;
    total_ids: number;
    not_taken_count: number;
  };
  
  export type CustomCardProps = {
    inLib: boolean;
    categoryColor: string;
  };

  export type BookInstance= {
    bookCode: number,
    name: string,
    author: string,
    price: number,
    category: string,
    publisher:PublisherType
    }

   export type BorrowBookInstance = {
      id: number;
      borrowing_id: number;
      book_instance: {
        price: number;
        author: string;
        category: string;
        bookCode: number;
        name: string;
        publisher: number;
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
      ids:number[]
    }
    
export type NewBookConfirmProps = {
  data: BorrowedBook[];
}
export type ExistingBookFormValues = {
    bookCode?: number | undefined;
    amount: number;
};

type BookInfo = {
  name: string;
  author: string;
  price: number;
  category: string;
  publisher: number |PublisherType;
  bookCode: number;
};

type BookItem = {
  bookCode: number;
  id: number;
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
export type HeaderProps ={
  title: string ;
}

export type NewBookConfirmProp =  {
  data: BookResponse | undefined;
}
export type selectedItemsProp =  {
  selectedItems: BookType[];
  setSelectedItems: React.Dispatch<React.SetStateAction<BookType[]>>;
}
// type BorrowedBook = {
//   id: number;
//   borrowing_id: number;
//   book_instance: BookInstance;
//   date_borrowed: string;
//   date_returned?: string; // Date returned is optional as it might not be present in "toreturn" array
// };

export type PublisherForm =  {
  name: string;
  country: string;
}
export type BookCardProp =  {
  book: BookLibrary ;
}
export type ReaderCardProp =  {
  reader: Reader ;
}
export type BorrowProp =  {
  name: string | undefined ;
}
export type AddReaderProps =  {
  onClose: () => void;
}
export type TopTenBook={
  book_bookCode:number,
  name:string,
  borrowcount:number
}