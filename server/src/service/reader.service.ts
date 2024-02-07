import {
  findReaders,
  saveReader,
  softRemove,
} from '../repository/reader.repository'

export const getReaders = async (searchTerm: string) =>
  await findReaders(searchTerm)

export const postReader = async (reader: any) => await saveReader(reader)

export const softDelete = async (id: number) => await softRemove(id)
