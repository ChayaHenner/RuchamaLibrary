import express, { Request, Response, NextFunction } from 'express';
import { getBookInstancesLibraryDB,getBookInstancesDB, postBookInstanceDB } from '../repository/bookinstance.repository';

export async function getBookInstances() {
    
        const publishers = await getBookInstancesDB();

        return publishers;
    
}
export async function getBookInstancesLibrary() {
    
        const publishers = await getBookInstancesLibraryDB();

        return publishers;
   
}
export async function postBooksInstance(books: any) {
    
        const bookinstance = await postBookInstanceDB(books);  
        return bookinstance;

}
