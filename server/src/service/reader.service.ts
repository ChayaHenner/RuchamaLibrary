import {
  getReadersDB,
  postReaderDB,
  softRemove,
} from '../repository/reader.repository'

export const getReaders = async (searchTerm: string) => {
  return await getReadersDB(searchTerm)
}

export const postReader = async (reader: any) => {
  return await postReaderDB(reader)
}

export const softDelete = async (id: number) => {
  return await softRemove(id)
}
