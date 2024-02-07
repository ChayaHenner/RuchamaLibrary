import express, { Request, Response, NextFunction } from 'express'
import {
  getPublishersDB,
  postPublisherDB,
  softDeleteDB,
} from '../repository/publisher.repository'

export const getPublishers = async () => {
  return await getPublishersDB()
}

export const postPublisher = async (publisher: any) => {
  return await postPublisherDB(publisher)
}

export const softDelete = async (id: number) => {
  return await softDeleteDB(id)
}
