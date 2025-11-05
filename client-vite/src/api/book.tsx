import { BookFormProps, BookType, ExistingBookFormValues } from '../utils/types'
import { Api } from './index'

export const postBook = async (data: BookFormProps) => {
  try {
    const response = await Api.post(
      '/books/newbook',
      data,
    )
    return response.data
  } catch (err) {
    throw err
  }
}
export const getBooksInLibrary = async (): Promise<BookType[]> => {
  try {
    const response = await Api.get('/books/inlibrary')
    console.log(response.data)
    return response.data
  } catch (error) {
    throw error
  }
}
export const postBookExisting = async (data: ExistingBookFormValues) => {
  try {
    const response = await Api.post('/books', data)
    console.log('existing Books added ', response.data)
    return response.data
  } catch (error) {
    console.error('Error making the request:', error)
  }
}
export const getLocationBook = async (id: number) => {
  try {
    const response = await Api.get(
      `/books/${id}/location`,
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    throw error
  }
}
