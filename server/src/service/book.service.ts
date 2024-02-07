import {
  findBooks,
  saveBook,
  softRemove,
  findBooksLibrary,
} from '../repository/book.repository'
import {
  findBookInstanceExists,
  findBookInstance,
  postBookInstanceDB,
} from '../repository/bookinstance.repository'
import { ExistingBook, NewBook } from '../types/book.type'

export const getBooks = async () => await findBooks()

export const getBooksInLibrary = async () => await findBooksLibrary()

export const postBooks = async (books: ExistingBook) => {
  const info = await findBookInstance(books.bookCode)
  console.log(books)

  let newBooks: object[] = []
  while (books.amount) {
    books.amount -= 1
    const book = await saveBook(books.bookCode)
    newBooks.push(book)
  }
  const newBookReport = {
    books: newBooks,
    info: info,
  }
  return newBookReport
}

export const postNewBooks = async (books: NewBook) => {
  const existingBookInstance = await findBookInstanceExists(
    books.name,
    books.author,
    books.publisher,
  )
  const bookInstance = existingBookInstance || (await postBookInstanceDB(books))
  console.log(books)

  let newBooks: object[] = []
  while (books.amount) {
    //5
    books.amount -= 1
    const book = await saveBook(bookInstance.bookCode)
    newBooks.push(book)
  }
  const newBookReport = {
    books: newBooks,
    info: bookInstance,
  }
  return newBookReport
}

export const softDelete = async (id: number) => {
  return await softRemove(id)
}
