import { Book } from '../entities/Book'
import { libraryData } from '../app'
import { FindManyOptions } from 'typeorm'
import { BookInstance } from '../entities/BookInstance'
import { ExistingBook, ExistingBookReal, NewBook } from '../types/book.type'
import { saveBookInstance } from './bookinstance.repository'

export const findBooks = () => Book.find()

export const findBooksLibrary = () => Book.find({ where: { bookTaken: false } })

export const saveBook = (bookCode: any) => Book.save({ bookCode })

export const softRemove = async (id: number) => {
  const book = await Book.findOneOrFail({
    where: { id },
  })
  return book.softRemove()
}

export const saveExistingBook = async (books: any) => {
  const bookInstance = await BookInstance.findOne({
    where: { bookCode: books.bookCode },
    relations: ['books'],
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
    relations: ['books'],
  })
  const { amount, ...book } = books

  const bookInstance = existingBookInstance || (await saveBookInstance(book))

  const newBooks: Book[] = Array(amount)
    .fill(null)
    .map(() => new Book())
  await Book.save(newBooks)

  bookInstance.books.push(...newBooks)
  await BookInstance.save(bookInstance)
  bookInstance.books = newBooks
  return bookInstance
}
