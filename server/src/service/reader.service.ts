import { getReadersDB, postReaderDB, softDeleteDB } from '../repository/reader.repository';

export const getReaders = async (searchTerm: string) => {
  const readers = await getReadersDB(searchTerm);
  return readers;
};

export const postReader = async (reader: any) => {
  const readerdb = await postReaderDB(reader);
  return readerdb;
};

export const softDelete = async (id: number) => {
  const readerdb = await softDeleteDB(id);
  return readerdb;
};
