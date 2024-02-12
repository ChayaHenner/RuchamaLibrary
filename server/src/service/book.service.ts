import {
  findBooks,
  saveBook,
  softRemove,
  findBooksLibrary,
  saveExistingBook,
  saveNewBooks,
} from '../repository/book.repository'
import {
  findBookInstanceExists,
  findBookInstance,
  saveBookInstance,
} from '../repository/bookinstance.repository'
import { ExistingBook, NewBook } from '../types/book.type'
import { newBookSchema } from '../validation/book.validate'

export const getBooks = async () => await findBooks()

export const getBooksInLibrary = async () => await findBooksLibrary()

export const postBooks = async (books: ExistingBook) => {
  const newBookReport = await saveExistingBook(books)
  return newBookReport
}

export const postNewBooks = async (books: NewBook) => await saveNewBooks(books)

export const softDelete = async (id: number) => await softRemove(id)
