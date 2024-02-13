import { BookInstance } from '../entities/BookInstance'
import {
  findBookInstancesLibrary,
  findBookInstances,
  saveBookInstance,
  softRemoveInstance,
} from '../repository/bookinstance.repository'

export const getBookInstances = async () => await findBookInstances()

export const getBookInstancesLibrary = async () =>
  await findBookInstancesLibrary()

export const postBooksInstance = async (books: BookInstance) =>
  await saveBookInstance(books)

export const softDeleteInstance = async (id: number) =>
  await softRemoveInstance(id)
