export type Publisher = {
  id: number | undefined
  name: string
}

export type BookFormProps = {
  name: string
  author: string
  publisher?: number | undefined
  amount: number
  category: string
  price: number
}

export type ReaderForm = {
  name: string
  email: string
  dob: Date | null // Dayjs | null
}

export type BorrowingInfo = {
  id: number
  dateBorrowed: string
  dateReturned: null
  book: BookBorrowingInfo
}
export type ReturnedInfo = {
  id: number
  dateBorrowed: string
  dateReturned: string
  book: BookBorrowingInfo
}

export type BookBorrowingInfo = {
  id: number
  bookCode: {
    price: number
    author: string
    category: string
    bookCode: number
    name: string
    publisher: Publisher
  }
}

type PublisherType = {
  id: number
  name: string
  country: string
  dateDeleted: string | null
}

type BookCode = {
  bookCode: number
  name: string
  author: string
  price: number
  category: string
  publisher: PublisherType
}

export type BookType = {
  id: number
  bookTaken: boolean
  bookCode: BookCode
}

export type Reader = {
  id: number
  name: string
  email: string
  dob: string
  dateDeleted: string | null
}
export type ReaderBorrowing = {
  id: number
  name: string
  email: string
  dob: string
  dateDeleted: string | null
  borrowings: BorrowedBook[]
}

export type BorrowedBook = {
  book: BookType
  dateReturned: string | null
  id: number
  dateBorrowed: string
}

export type BookLibrary = {
  book_bookCodeBookCode: number
  bookinstance_name: string
  bookinstance_author: string
  bookinstance_category: string
  bookinstance_publisher: number
  books: Array<{
    id: number
    bookTaken: boolean
  }>
  total_ids: number
  not_taken_count: number
}

export type CustomCardProps = {
  inlib: string
  categorycolor: string
}

export type BookInstance = {
  bookCode: number
  name: string
  author: string
  price: number
  category: string
  publisher: PublisherType
}

export type BorrowBookInstance = {
  id: number
  bookTaken: boolean
  bookCode: {
    bookCode: number
    name: string
    author: string
    price: number
    category: string
    publisher: PublisherType
  }
}

export type ReaderWithUnreturnedBooks = {
  reader_id: number
  reader_name: string
  reader_email: string
  unreturned_books: BorrowBookInstance[]
}

export type RowProps = {
  row: ReaderWithUnreturnedBooks
}

export type BorrowBooks = {
  reader?: number | null | undefined
  ids: number[]
}

export type NewBookConfirmProps = {
  data: ReaderBorrowing | undefined
}
export type ExistingBookFormValues = {
  bookCode: number | undefined // |BookInstance | null
  amount: number
}

type BookInfo = {
  name: string
  author: string
  price: number
  category: string
  publisher: number | PublisherType
  bookCode: number
}

type BookItem = {
  bookCode: number
  id: number
  bookTaken: boolean
}

export type BookResponse = {
  books: BookItem[]
  info: BookInfo
}

export type ReaderInfo = {
  id: number
  name: string
  email: string
  dob: Date
  dateDeleted: Date | null
  toReturn: BorrowingInfo[]
  history: ReturnedInfo[]
}
export type ReturnTableProps = {
  toReturn: BorrowingInfo[]
}
export type HistoryTableProps = {
  history: ReturnedInfo[]
}
export type HeaderProps = {
  title: string
}

export type NewBookConfirmProp = {
  data: BookResponse | undefined
}
export type selectedItemsProp = {
  selectedItems: BookType[]
  setSelectedItems: React.Dispatch<React.SetStateAction<BookType[]>>
}
// type BorrowedBook = {
//   id: number;
//   borrowing_id: number;
//   book_instance: BookInstance;
//   dateBorrowed: string;
//   dateReturned?: string; // Date returned is optional as it might not be present in "toreturn" array
// };

export type PublisherForm = {
  name: string
  country: string
}
export type BookCardProp = {
  book: BookInstanceLibrary
}
export type ReaderCardProp = {
  reader: Reader
}
export type BorrowProp = {
  name: string | undefined
}
export type AddReaderProps = {
  onClose: () => void
}
export type TopTenBook = {
  book_bookCode: number
  name: string
  borrowcount: number
}

export type BookConfirmNewest = {
  bookCode: number
  name: string
  author: string
  price: number
  category: string
  books: {
    id: number
    bookTaken: boolean
    bookCode?: {
      bookCode: number
      name: string
      author: string
      price: number
      category: string
    }
  }[]
  publisher: {
    id: number
    name: string
    country: string
    dateDeleted: Date | null
  }
}
export type NewBookConfirmP = {
  data: BookConfirmNewest | undefined
}

export type Book = {
  id: number
  bookTaken: boolean
  bookCode: {
    bookCode: number
    name: string
    author: string
    price: number
    category: string
  }
}

export type BookInstanceLibrary = {
  bookCode: number
  name: string
  author: string
  price: number
  category: string
  books: Book[]
  publisher: PublisherType
  booksNotTaken: number
  booksCount: number
}
export type PublisherReport = {
  id: number
  name: string
  country: string
  bookcount: number
  publisherprice: number
}
export type DataGridApi = {
  getSelectedRows: () => BorrowingInfo[]
}
