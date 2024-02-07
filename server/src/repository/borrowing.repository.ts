import { Borrowing } from '../entities/Borrowing'
import { Book } from '../entities/Book'
import { Reader } from '../entities/Reader'
import { libraryData } from '../app'

export const findTopTenBooks =  () => {
  return  libraryData
    .getRepository(Borrowing)
    .createQueryBuilder('borrowing')
    .leftJoinAndSelect('borrowing.book', 'book')
    .leftJoinAndSelect('book.bookCode', 'bookinstance')
    .select([
      'book.bookCode',
      'bookinstance.name AS name',
      'CAST(COUNT(borrowing.id) AS INT) AS borrowCount',
    ])
    .groupBy('book.bookCode ,bookinstance.name')
    .orderBy('borrowCount', 'DESC')
    .limit(10)
    .getRawMany()
}

export const findBorrowingByReader =  (id: number) => {
  const result =  libraryData
    .getRepository(Borrowing)
    .createQueryBuilder('borrowing')
    .leftJoinAndSelect('borrowing.book', 'book')
    .leftJoinAndSelect('borrowing.reader', 'reader')
    .leftJoinAndSelect('book.bookCode', 'bookinstance')
    .andWhere('reader.id = :readerId', { readerId: id })
    .select([
      'reader.id',
      'reader.name',
      'reader.email',
      `JSON_AGG(CASE WHEN borrowing.dateReturned IS NULL THEN jsonb_build_object('id', book.id, 'book_instance', to_jsonb(bookinstance), 'dateBorrowed', borrowing.dateBorrowed, 'borrowing_id', borrowing.id) END) FILTER(WHERE borrowing.dateReturned IS NULL) AS toreturn`,
      `JSON_AGG(CASE WHEN borrowing.dateReturned IS NOT NULL THEN jsonb_build_object('id', book.id, 'book_instance', to_jsonb(bookinstance), 'dateBorrowed', borrowing.dateBorrowed, 'borrowing_id', borrowing.id, 'dateReturned', borrowing.dateReturned) END) FILTER(WHERE borrowing IS NOT NULL) AS history`,
    ])
    .groupBy('reader.id,reader.name,reader.email ')
    .getRawOne()

  if (!result) {
    const readerInfo =  libraryData
      .getRepository(Reader)
      .createQueryBuilder('reader')
      .select(['reader.id', 'reader.name', 'reader.email'])
      .where('reader.id = :readerId', { readerId: id })
      .getRawOne()

    console.log('Reader info:', readerInfo)

    return readerInfo
  }
  return result
}

export const findBorrowings = async () => await Borrowing.find()

export const findBookDB = async (id: number) =>
  await Book.findOne({ where: { id } })

export const findReaderDB = async (id: number) =>
  await Reader.findOne({ where: { id } })

export const findBorrow = async (id: number) =>
  await Borrowing.findOne({ where: { id } })

export const createBorrowingDB = async (borrowing: any) => {
  return Borrowing.save({
    ...borrowing,
  })
}

export const returnBorrowingDB = async (id: number) => {
  let borrowing = await Borrowing.findOne({ where: { id } })
  if (borrowing && borrowing.dateReturned == null) {
    borrowing.dateReturned = new Date()
    await Borrowing.save(borrowing)
    return borrowing
  } else throw 'borrowing id incorrect or returned already'
}

export const updateBookTaken = async (id: number) => {
  let book = await Book.findOne({ where: { id } })

  if (book) {
    book!.bookTaken = true
    await Book.save(book)
    return book
  }
}

export const updateBookNotTaken = async (id: number) => {
  let book = await Book.findOne({ where: { id } })
  console.log(book)

  if (book) {
    book!.bookTaken = false
    console.log('changed to false')

    await Book.save(book)
    return book
  }
}

export const checkBookTaken = async (id: number) => {
  let book = await Book.findOne({ where: { id } })
  if (book) {
    return book!.bookTaken
  } else return false
}

export const getTwoWeeksPassedDB = async () => {
  const TwoWeeksPassed = await libraryData
    .getRepository(Borrowing)
    .createQueryBuilder('borrowing')
    .leftJoinAndSelect('borrowing.book', 'book')
    .leftJoinAndSelect('borrowing.reader', 'reader')
    .leftJoinAndSelect('book.bookCode', 'bookinstance')
    .where('borrowing.dateReturned IS NULL')
    .andWhere('reader.id IS NOT NULL') // readers that were deleted... problomatic
    .andWhere("borrowing.dateBorrowed < NOW() - INTERVAL '5 days'")

    .select([
      'reader.id',
      'reader.name',
      'reader.email',
      "JSON_AGG(CASE WHEN borrowing.dateReturned IS NULL THEN jsonb_build_object('book', book.id, 'book_instance', to_jsonb(bookinstance), 'dateBorrowed', borrowing.dateBorrowed ,'borrowing_id', borrowing.id) END) AS unreturned_books",
    ])
    .groupBy('reader.id,reader.name,reader.email ')
    .getRawMany()

  return TwoWeeksPassed
}
