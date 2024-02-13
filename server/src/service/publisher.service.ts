import express, { Request, Response, NextFunction } from 'express'
import {
  findPublishers,
  savePublisher,
  softRemove,
  findPublisherReport,
} from '../repository/publisher.repository'
import { Publisher } from '../entities/Publisher'

export const getPublishers = async () => await findPublishers()
export const getReport = async () => await findPublisherReport()

export const postPublisher = async (publisher: Publisher) =>
  await savePublisher(publisher)

export const softDelete = async (id: number) => await softRemove(id)
