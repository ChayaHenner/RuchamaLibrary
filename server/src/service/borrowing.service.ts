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
} from '../repository/borrowing.repository'

export const getBorrowing = async () => {
  return await findBorrowings()
}

export const getBorrowingByReader = async (reader: number) => {
  return await findBorrowingByReader(reader)
} //?

export const postBorrowBook = async (borrow: any): Promise<any> => {
  const book = await findBookDB(borrow.id)
  const reader = await findReaderDB(borrow.reader)

  if (book && reader) {
    const bookTaken = await checkBookTaken(borrow.id)

    if (!bookTaken) {
      const newBorrowing = createBorrowingDB(borrow)
      updateBookTaken(borrow.id)
      return newBorrowing
    } else {
      throw 'book not in library'
    }
  } else {
    throw 'book or reader not exist'
  }
}

export const postBorrowMany = async (borrows: any) => {
  const borrowedarray: any[] = []
  const reader = await findReaderDB(borrows.reader)

  for (const id of borrows.ids) {
    const book = await findBookDB(id)

    if (book && reader) {
      const bookTaken = await checkBookTaken(id)

      if (!bookTaken) {
        const borrow = {
          book: book,
          reader: reader,
        }

        await updateBookTaken(id)
        const newBorrowing = await createBorrowingDB(borrow)
        borrowedarray.push(newBorrowing)
      } else {
        throw new Error(
          `book ${id} not in library.only added books until this one`,
        )
      }
    } else {
      throw new Error('book or reader not exist')
    }
  }

  return borrowedarray
}

export const postReturnBook = async (borrow: any) => {
  const returnbook = returnBorrowingDB(borrow.id)
  updateBookNotTaken((await returnbook).book.id)
  return findBorrow(borrow.id)
}

export const postReturnManyBooks = async (returnBooks: any) => {
  const returnedarray: any[] = []

  for (const borrowId of returnBooks.borrowIds) {
    try {
      const returnbook = await returnBorrowingDB(borrowId)
      await updateBookNotTaken(returnbook.book.id)
      const book = await findBorrow(borrowId)
      returnedarray.push(book)
    } catch (err) {
      throw err
    }
  }

  return returnedarray
}

export const toptenbooks = async () => {
  return await findTopTenBooks()
}

export const twoweekspassed = async () => {
  return await getTwoWeeksPassedDB()
}
