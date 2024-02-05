import express, { Request, Response, NextFunction } from 'express';
import { getPublishersDB , postPublisherDB ,softDeleteDB} from '../repository/publisher.repository';

export async function getPublishers(){
 
        const publishers = await getPublishersDB();
        return publishers;
}
export async function postPublisher(publisher:any){
    
        const publisherdb = await postPublisherDB(publisher);
        return publisherdb;
   
}
export async function softDelete(id:number){

        const publisher = await softDeleteDB(id);
        return publisher;
  
}