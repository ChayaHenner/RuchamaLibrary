import express, { Request, Response, NextFunction } from 'express';
import { getReadersDB, postReaderDB, softDeleteDB } from '../repository/reader.repository';

export async function getReaders(searchTerm: string) {

  const readers = await getReadersDB(searchTerm);

  return readers;

}
export async function postReader(reader: any) {

  const readerdb = await postReaderDB(reader);
  return readerdb;

}
export async function softDelete(id: number) {

  const readerdb = await softDeleteDB(id);
  return readerdb;

}