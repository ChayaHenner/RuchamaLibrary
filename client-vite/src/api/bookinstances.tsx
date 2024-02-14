import axios from 'axios'
import { BookInstance, BookInstanceLibrary } from '../utils/types'

export const getBookInstances = async (): Promise<BookInstance[]> => {
  try {
    const response = await axios.get('http://localhost:5000/booksinstance')
    return response.data
  } catch (error) {
    throw error
  }
}
export const getBooksLibrary = async (): Promise<BookInstanceLibrary[]> => {
  try {
    const response = await axios.get(
      'http://localhost:5000/booksinstance/library',
    )
    return response.data
  } catch (error) {
    throw error
  }
}
export const patchDeleteBook = async (id: number) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/booksinstance/${id}/soft-delete`,
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    throw error
  }
}
