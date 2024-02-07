import { BookInstance } from '../entities/BookInstance'
import {
  findBookInstancesLibrary,
  findBookInstances,
  saveBookInstance,
} from '../repository/bookinstance.repository'

export const getBookInstances = async () => await findBookInstances()

export const getBookInstancesLibrary = async () => await findBookInstancesLibrary()

export const postBooksInstance = async (books: BookInstance) => await saveBookInstance(books)
