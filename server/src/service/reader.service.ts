import { Reader } from '../entities/Reader'
import {
  findReaders,
  saveReader,
  softRemove,
} from '../repository/reader.repository'

export const getReaders = async (searchTerm: string) =>
  await findReaders(searchTerm)

export const postReader = async (reader: Reader) => await saveReader(reader)

export const softDelete = async (id: number) => await softRemove(id)
