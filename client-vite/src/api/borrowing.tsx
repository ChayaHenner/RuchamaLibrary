import {
  BorrowBooks,
  ReaderBorrowing,
  ReaderWithUnreturnedBooks,
  TopTenBook,
} from '../utils/types'
import axios from 'axios'

export const getOverdueReaders = async (): Promise<
  ReaderWithUnreturnedBooks[]
> => {
  try {
    const response = await axios.get('http://localhost:5000/borrowing/twoweeks')
    console.log(response.data)

    return response.data
  } catch (error) {
    throw error
  }
}
export const getTopTen = async (): Promise<TopTenBook[]> => {
  try {
    const response = await axios.get('http://localhost:5000/borrowing/topten')
    console.log(response.data)

    return response.data
  } catch (error) {
    throw error
  }
}
export const postBorrow = async (
  borrow: BorrowBooks,
): Promise<ReaderBorrowing> => {
  console.log(borrow)

  try {
    const response = await axios.post(
      'http://localhost:5000/borrowing/borrowmany',
      borrow,
    )
    console.log(response)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}
export const postReturn = async (selectedRows: number[]) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/borrowing/returnmany',
      { borrowIds: selectedRows },
    )
    console.log(response)
   
  } catch (err) {
    console.error(err)
  }
}
