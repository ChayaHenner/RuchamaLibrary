import { Book } from '../entities/Book'
import { libraryData } from '../app'
import { FindManyOptions } from 'typeorm'

export const getBooksDB = () => Book.find()

export const getBooksInLibraryDB = () =>
  Book.find({ where: { bookTaken: false } })

export const postBookDB = async (bookCode: any) => Book.save({ bookCode })

export const softDeleteDB = async (id: number) => {
  const book = await Book.findOneOrFail({
    where: { id: id },
  })

  return book.softRemove()
}
