import { Book } from '../entities/Book'
import { libraryData } from '../app'
import { FindManyOptions } from 'typeorm'

export const findBooks = () => Book.find()

export const findBooksLibrary = () => Book.find({ where: { bookTaken: false } })

export const saveBook =  (bookCode: any) => Book.save({ bookCode })

export const softRemove = async (id: number) => {
  const book = await Book.findOneOrFail({
    where: { id },
  })

  return book.softRemove()
}
