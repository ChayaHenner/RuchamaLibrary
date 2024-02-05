import express, { Request, Response, NextFunction } from 'express';
import { getBookInstancesLibraryDB,getBookInstancesDB, postBookInstanceDB } from '../repository/bookinstance.repository';

export const getBookInstances = async () => {
        const publishers = await getBookInstancesDB();
        return publishers;
      };
      
      export const getBookInstancesLibrary = async () => {
        const publishers = await getBookInstancesLibraryDB();
        return publishers;
      };
      
      export const postBooksInstance = async (books: any) => {
        const bookinstance = await postBookInstanceDB(books);
        return bookinstance;
      };
      