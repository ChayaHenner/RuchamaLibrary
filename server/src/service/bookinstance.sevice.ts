import express, { Request, Response, NextFunction } from 'express';
import { getBookInstancesLibraryDB,getBookInstancesDB, postBookInstanceDB } from '../repository/bookinstance.repository';

export async function getBookInstances() {
    try {
        const publishers = await getBookInstancesDB();

        return publishers;
    } catch (error) {
        throw error;
    }
}
export async function getBookInstancesLibrary() {
    try {
        const publishers = await getBookInstancesLibraryDB();

        return publishers;
    } catch (error) {
        throw error;
    }
}
export async function postBooksInstance(books: any) {
    try {
        
        const bookinstance = await postBookInstanceDB(books);  
        return bookinstance;

    } catch (error) {
        throw error;
    }
}
