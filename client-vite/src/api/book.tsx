import { BookFormProps, BookType, ExistingBookFormValues } from '../utils/types'
import axios from 'axios'

export const postBook = async (data: BookFormProps) => {
  console.log(data)
  try {
    const response = await axios.post(
      'http://localhost:5000/books/newbook',
      data,
    )
    return response.data
  } catch (err) {
    throw err
  }
}
export const getBooksInLibrary = async (): Promise<BookType[]> => {
  try {
    const response = await axios.get('http://localhost:5000/books/inlibrary')
    console.log(response.data)
    return response.data
  } catch (error) {
    throw error
  }
}
export const postBookExisting = async (data: ExistingBookFormValues) => {
  try {
    const response = await axios.post('http://localhost:5000/books', data)
    console.log('existing Books added ', response.data)
    return response.data
  } catch (error) {
    console.error('Error making the request:', error)
  }
}
