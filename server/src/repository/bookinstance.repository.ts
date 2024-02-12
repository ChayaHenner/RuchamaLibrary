import { BookInstance } from '../entities/BookInstance'
import { Book } from '../entities/Book'
import { libraryData } from '../app'
import { BookInstanceType } from '../types/bookInstance.type'
import { Publisher } from '../entities/Publisher'

export const findBookInstances = () => BookInstance.find()

export const findBookInstance = (bookCode: number) => {
  const bookInstance = BookInstance.findOne({
    where: { bookCode: bookCode },
  })
  if (!bookInstance) {
    throw new Error(`Book instance with bookCode ${bookCode} not found`)
  }
  return bookInstance
}

export const findBookInstancesLibrary = async () => {
  const bookInstances = await BookInstance.find({
    relations: ['books'],
  })

  const library = bookInstances.map((bookInstance) => {
    const booksCount = bookInstance.books.length
    const booksNotTaken = bookInstance.books.filter(
      (book: Book) => book.bookTaken === false,
    ).length
    return {
      ...bookInstance,
      booksNotTaken,
      booksCount,
    }
  })

  return library
}

export const saveBookInstance = (
  bookInstance: any, //?
) =>
  BookInstance.save({
    ...bookInstance,
  })

export const findBookInstanceExists = async (
  bookName: string,
  author: string,
  publisherId: number,
) => {
  const publisher = await Publisher.findOne({ where: { id: publisherId } })
  if (!publisher) {
    return null
  }
  const bookInstance = BookInstance.findOne({
    where: { name: bookName, author, publisher },
  })

  return bookInstance || null
}
