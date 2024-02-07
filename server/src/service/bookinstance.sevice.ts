import {
  findBookInstancesLibrary,
  findBookInstances,
  postBookInstanceDB,
} from '../repository/bookinstance.repository'

export const getBookInstances = async () =>  await findBookInstances()

export const getBookInstancesLibrary = async () =>  await findBookInstancesLibrary()

export const postBooksInstance = async (books: any) =>  await postBookInstanceDB(books)

