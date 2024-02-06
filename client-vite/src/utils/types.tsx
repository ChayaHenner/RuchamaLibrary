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
    id: string;
    book_code: string;
    book_taken: string;
  }

  export type BookReturn = {
    id: number;
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
    id: number;
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
    book: BookType;
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
    book_code: number,
    book_name: string,
    author: string,
    price: number,
    category: string,
    publisher_id:PublisherType
    }

   export type BorrowBookInstance = {
      id: number;
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
      ids:number[]
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
  publisher_name: string;
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
  book_book_code:number,
  name:string,
  borrowcount:number
}