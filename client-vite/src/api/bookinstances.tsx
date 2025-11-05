import { Api } from './index'
import { BookInstance, BookInstanceLibrary } from '../utils/types'

export const getBookInstances = async (): Promise<BookInstance[]> => {
  try {
    const response = await Api.get('/booksinstance')
    return response.data
  } catch (error) {
    throw error
  }
}
export const getBooksLibrary = async (): Promise<BookInstanceLibrary[]> => {
  try {
    const response = await Api.get(
      '/booksinstance/library',
    )
    return response.data
  } catch (error) {
    throw error
  }
}
export const patchDeleteBook = async (id: number) => {
  try {
    const response = await Api.patch(
      `/booksinstance/${id}/soft-delete`,
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    throw error
  }
}
