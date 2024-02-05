import express, { Request, Response, NextFunction } from 'express';
import { getPublishersDB , postPublisherDB ,softDeleteDB} from '../repository/publisher.repository';

export async function getPublishers(){
    try {
        const publishers = await getPublishersDB();
        
        return publishers;
      } catch (error) {
        throw error;
      }
}
export async function postPublisher(publisher:any){
    try {
        const publisherdb = await postPublisherDB(publisher);
        return publisherdb;
      } catch (error) {
        throw error;
      }
}
export async function softDelete(id:number){
    try {
        const publisher = await softDeleteDB(id);
        return publisher;
      } catch (error) {
        throw error;
      }
}