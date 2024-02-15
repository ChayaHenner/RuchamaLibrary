import { Book } from '../entities/Book'
import { libraryData } from '../app'
import { FindManyOptions } from 'typeorm'
import { BookInstance } from '../entities/BookInstance'
import { ExistingBook, ExistingBookReal, NewBook } from '../types/book.type'
import { saveBookInstance } from './bookinstance.repository'
import { Borrowing } from '../entities/Borrowing'

export const findBooks = () => Book.find()

export const findBooksLibrary = () => Book.find({ where: { bookTaken: false } })

export const saveBook = (bookCode: any) => Book.save({ bookCode })

export const softRemove = async (id: number) => {
  const book = await Book.findOneOrFail({
    where: { id },
  })
  return book.softRemove()
}
// export const findBook = async (id: number) => {
//   try {
//     const books = await Book.find({
//       relations: ['borrowings'],
//     });

//     const booksStatus = books.map(book => {
//       const currentBorrowing = book.borrowings.find(borrowing => borrowing.dateReturned === null);
//       if (!currentBorrowing) {
//         if(book.bookTaken)
//         return book //change booktaken to false and save
//  }
//     });

//     return booksStatus;
//   } catch (error) {
//     throw new Error(`Error finding book: `);
//   }
// };
// export const findBook = async (id: number) => {
//   try {
//     const books = await Book.find({
//       relations: ['borrowings'],
//     });

//     const updatedBooks = books.map(async (book) => {
//       const currentBorrowing = book.borrowings.find(borrowing => borrowing.dateReturned === null);
//       if (!currentBorrowing && book.bookTaken) {
//         book.bookTaken = false;
//         await book.save();
//         return book;
//       } else {
//         return null;
//       }
//     });

//     await Promise.all(updatedBooks);

//     const filteredBooks = updatedBooks.filter(book => book !== null);

//     return filteredBooks;
//   } catch (error) {
//     throw new Error(`Error finding book: ${error}`);
//   }
// };

export const findBook = async (id: number) => {
  try {
    const book = await Book.find({
      where: { id },
      relations: { borrowings: true, bookCode: true },
    })
    return book
  } catch (error) {
    throw new Error(`Error finding book location: ${error}`)
  }
}

export const findLocation = async (id: number) => {
  const book = await Book.findOneOrFail({
    where: { id },
    relations: { borrowings: { reader: true } },
  })
  const currentBorrowing = book.borrowings.find(
    (borrowing) => borrowing.dateReturned === null,
  )
  if (currentBorrowing) {
    return currentBorrowing.reader.name
  } else {
    return 'In library'
  }
}

export const saveExistingBook = async (books: ExistingBookReal) => {
  const bookInstance = await BookInstance.findOne({
    where: { bookCode: books.bookCode },
    relations: { books: true },
  })

  if (!bookInstance) {
    throw new Error('Book instance not found')
  }

  const newBooks: Book[] = Array(books.amount)
    .fill(null)
    .map(() => new Book())
  await Book.save(newBooks)

  bookInstance.books.push(...newBooks)
  await BookInstance.save(bookInstance)
  bookInstance.books = newBooks
  return bookInstance
}

export const saveNewBooks = async (books: NewBook) => {
  const existingBookInstance = await BookInstance.findOne({
    where: { name: books.name, author: books.author },
    relations: { books: true },
  })
  const { amount, ...book } = books

  const bookInstance = existingBookInstance || (await saveBookInstance(book))

  const newBooks: Book[] = Array(amount)
    .fill(null)
    .map(() => new Book())
  await Book.save(newBooks)

  if (bookInstance.books) {
    bookInstance.books.push(...newBooks)
  } else {
    bookInstance.books = newBooks
  }
  await BookInstance.save(bookInstance)
  bookInstance.books = newBooks
  return bookInstance
}
