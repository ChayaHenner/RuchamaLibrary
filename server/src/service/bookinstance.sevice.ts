import express, { Request, Response, NextFunction } from 'express'
import {
  getBookInstancesLibraryDB,
  getBookInstancesDB,
  postBookInstanceDB,
} from '../repository/bookinstance.repository'

export const getBookInstances = async () => {
  return await getBookInstancesDB()
}

export const getBookInstancesLibrary = async () => {
  return await getBookInstancesLibraryDB()
}

export const postBooksInstance = async (books: any) => {
  return await postBookInstanceDB(books)
}
