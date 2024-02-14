import { Borrowing } from '../entities/Borrowing'
import { Book } from '../entities/Book'
import { Reader } from '../entities/Reader'
import { libraryData } from '../app'
import { Borrows } from '../types/borrowing.types'

export const findTopTenBooks = () => {
  return libraryData
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

export const findBorrowingByReader = async (id: number) => {
  const reader = await Reader.findOne({
    where: { id },
    relations: { borrowings: { book: { bookCode: true } } },
    withDeleted: true,
  })
 

  if (!reader) {
    throw new Error(`reader with id ${id} not found`)
  }
  const { borrowings, ...readerData } = reader

  const toReturn = borrowings
    .filter((borrowing: Borrowing) => borrowing.dateReturned === null)
    .map((borrowing: Borrowing) => {
      const { reader, ...borrowingWithoutReader } = borrowing
      return borrowingWithoutReader
    })
  const history = borrowings
    .filter((borrowing: Borrowing) => borrowing.dateReturned != null)
    .map((borrowing: Borrowing) => {
      const { reader, ...borrowingWithoutReader } = borrowing
      return borrowingWithoutReader
    })

  return {
    ...readerData,
    toReturn,
    history,
  }
}

export const findBorrowings = async () => await Borrowing.find()

export const findBookDB = async (id: number) =>
  await Book.findOne({ where: { id } })

export const findReaderDB = async (id: number) =>
  await Reader.findOne({ where: { id } })

export const findBorrow = async (id: number) =>
  await Borrowing.findOne({ where: { id } })

export const createBorrowingDB = async (borrowing: Borrowing) => {
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
  if (book) {
    book!.bookTaken = false
    return await Book.save(book)
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
    .andWhere("borrowing.dateBorrowed < NOW() - INTERVAL '5 days'") //2 weeks
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

export const createManyBorrowings = async (borrows: Borrows) => {
  const { reader, ids } = borrows
  const readerBorrow = await Reader.findOne({
    where: { id: reader },
    relations: { borrowings: true },
  })

  if (!readerBorrow) {
    throw new Error('Reader not found')
  }

  for (const id of ids) {
    const b = await Book.findOne({ where: { id } })
    if (!b || b.bookTaken) {
      throw new Error(
        `Invalid book ID ${id} or book already taken.borrow unsuccessful`,
      )
    }

    const borrowings: Borrowing[] = []
    for (const book of ids) {
      const borrowing = new Borrowing()
      const b = await Book.findOne({ where: { id: book } })
      if (b) {
        borrowing.book = b
        // borrowing.reader = readerBorrow
        await updateBookTaken(book)
        await Borrowing.save(borrowing)
        borrowings.push(borrowing)
      }
    }
    readerBorrow.borrowings.push(...borrowings)
    await readerBorrow.save()
    readerBorrow.borrowings = borrowings
    return readerBorrow
  }
}
