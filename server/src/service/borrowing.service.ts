import { Borrowing } from '../entities/Borrowing'
import {findStats,
  findBorrowingByReader,
  getTwoWeeksPassedDB,
  findTopTenBooks,
  findBorrow,
  findBorrowings,
  createBorrowingDB,
  findBookDB,
  findReaderDB,
  checkBookTaken,
  updateBookTaken,
  returnBorrowingDB,
  updateBookNotTaken,
  createManyBorrowings,
} from '../repository/borrowing.repository'
import { returnBooks } from '../types/bookInstance.type'
import { Borrows } from '../types/borrowing.types'

export const getBorrowing = async () => await findBorrowings()

export const getBorrowingByReader = async (reader: number) =>
  await findBorrowingByReader(reader)

export const postBorrowMany = async (borrows: Borrows) =>
  await createManyBorrowings(borrows)

export const postReturnManyBooks = async (returnBooks: returnBooks) => {
  const returnedarray: Borrowing[] = []

  for (const borrowId of returnBooks.borrowIds) {
    const returnbook = await returnBorrowingDB(borrowId)
    await updateBookNotTaken(returnbook.book.id)
    const borrow = await findBorrow(borrowId)
    if (borrow) returnedarray.push(borrow)
  }

  return returnedarray
}

export const toptenbooks = async () => await findTopTenBooks()
export const stats = async () => await findStats()

export const twoweekspassed = async () => await getTwoWeeksPassedDB()
