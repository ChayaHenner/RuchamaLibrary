import express, { Request, Response, NextFunction } from 'express';
import { getPublishersDB , postPublisherDB ,softDeleteDB} from '../repository/publisher.repository';

export const getPublishers = async () => {
  const publishers = await getPublishersDB();
  return publishers;
};

export const postPublisher = async (publisher: any) => {
  const publisherdb = await postPublisherDB(publisher);
  return publisherdb;
};

export const softDelete = async (id: number) => {
  const publisher = await softDeleteDB(id);
  return publisher;
};
