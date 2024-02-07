import { BookInstance } from '../entities/BookInstance'
import { Book } from '../entities/Book'
import { libraryData } from '../app'
import { BookInstanceType } from '../types/bookInstance.type'

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

export const findBookInstancesLibrary = () => {
  //7
  const bookInstancesWithCounts = libraryData
    .getRepository(Book)
    .createQueryBuilder('book')
    .select([
      'book.bookCode',
      'bookinstance.name',
      'bookinstance.author',
      'bookinstance.category',
      "JSON_AGG(JSON_BUILD_OBJECT('id', book.id, 'bookTaken', book.bookTaken)::jsonb) AS books",
      'CAST(COUNT(book.id) AS INTEGER) AS total_ids',
      'CAST(SUM(CASE WHEN book.bookTaken = false THEN 1 ELSE 0 END) AS INTEGER) AS not_taken_count',
    ])
    .leftJoin('book.bookCode', 'bookinstance')
    .groupBy(
      'book.bookCode ,bookinstance.name  ,bookinstance.author  ,bookinstance.category',
    )
    .getRawMany()

  return bookInstancesWithCounts
}

export const saveBookInstance = (bookinstance:any)=>{// BookInstanceType) => {
  return BookInstance.save({
    ...bookinstance,
  })
}

//8
export const findBookInstanceExists = (
  bookName: string,
  author: string,
  publisher: number,
): Promise<any | null> => {
  const bookInstance = BookInstance.findOne({
    where: { name: bookName, author },
  }) //,publisher??
  return bookInstance || null
}
