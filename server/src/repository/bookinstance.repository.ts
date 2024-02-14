import { BookInstance } from '../entities/BookInstance'
import { Book } from '../entities/Book'
import { libraryData } from '../app'
import { BookInstanceType } from '../types/bookInstance.type'
import { Publisher } from '../entities/Publisher'
import { IsNull, Not } from 'typeorm'

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
    relations: { books: true },
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
  bookInstance: any, //??
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

export const softRemoveInstance = async (bookCode: number) => {
  const bookInstance = await BookInstance.findOne({
    where: { bookCode },
    relations: { books: true },
  })

  if (bookInstance) {
    console.log(bookInstance)
    const notAllBooksAreInLib = bookInstance.books.some(
      (book) => book.bookTaken,
    )

    if (!notAllBooksAreInLib) {
      await Promise.all(
        bookInstance.books.map(async (book) => {
          await book.softRemove()
        }),
      )

      return await bookInstance.softRemove()
    } else
      throw new Error(
        'Books of this Book Instance are not in Library.cant erase. Cannot delete.',
      )
  } else throw new Error('Book Instance does not exist')
}
