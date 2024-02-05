import express, { Request, Response, NextFunction } from 'express';
import { getReadersDB , postReaderDB ,softDeleteDB} from '../repository/reader.repository';

export async function getReaders(searchTerm:string){
    try {
        const readers = await getReadersDB(searchTerm);
        
        return readers;
      } catch (error) {
        throw error;
      }
}
export async function postReader(reader:any){
    try {
        const readerdb = await postReaderDB(reader);
        return readerdb;
      } catch (error) {
        throw error;
      }
}
export async function softDelete(id:number){
    try {
        const readerdb = await softDeleteDB(id);
        return readerdb;
      } catch (error) {
        throw error;
      }
}