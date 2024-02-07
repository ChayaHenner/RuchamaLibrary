import express, { Request, Response, NextFunction } from 'express'
import {
  findPublishers,
  savePublisher,
  softRemove,
} from '../repository/publisher.repository'

export const getPublishers = async () => await findPublishers()

export const postPublisher = async (publisher: any) =>
  await savePublisher(publisher)

export const softDelete = async (id: number) => await softRemove(id)
