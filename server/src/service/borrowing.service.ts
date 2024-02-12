import { Borrowing } from '../entities/Borrowing'
import {
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

// export const postBorrowBook = async (borrow: any): Promise<any> => {
//   const book = await findBookDB(borrow.id)
//   const reader = await findReaderDB(borrow.reader)

//   if (book && reader) {
//     const bookTaken = await checkBookTaken(borrow.id)

//     if (!bookTaken) {
//       const newBorrowing = createBorrowingDB(borrow)
//       updateBookTaken(borrow.id)
//       return newBorrowing
//     } else {
//       throw 'book not in library'
//     }
//   } else {
//     throw 'book or reader not exist'
//   }
// }

export const postBorrowMany = async (borrows: Borrows) =>
 await createManyBorrowings(borrows)


  

// export const postReturnBook = async (borrow: any) => {
//   const returnbook = returnBorrowingDB(borrow.id)
//   updateBookNotTaken((await returnbook).book.id)
//   return findBorrow(borrow.id)
// }

export const postReturnManyBooks = async (returnBooks: returnBooks) => {
  const returnedarray: Borrowing[] = []

  for (const borrowId of returnBooks.borrowIds) {
    const returnbook = await returnBorrowingDB(borrowId)
    await updateBookNotTaken(returnbook.book.id)
    const borrow = await findBorrow(borrowId)
    if(borrow)
    returnedarray.push(borrow)
  }

  return returnedarray
}

export const toptenbooks = async () => await findTopTenBooks()

export const twoweekspassed = async () => await getTwoWeeksPassedDB()
