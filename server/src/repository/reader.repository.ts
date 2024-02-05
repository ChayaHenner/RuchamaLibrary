import { Reader } from '../entities/Reader'
import { FindManyOptions ,ILike } from 'typeorm';

 
export async function  getReadersDB(searchTerm:string){
    try {
      const options: FindManyOptions<Reader> = {};
      if (searchTerm) {
        options.where = {
          name: ILike(`%${searchTerm}%`),
        };
      }
  
      const readers = await Reader.find(options);     
        return readers;
      } catch (error) {
        throw error;
      }
}
export async function  postReaderDB(reader:any){
    try {
        const newReader = Reader.create({
            name: reader.name,
            email:reader.email,
           dob: new Date(reader.dob),
          });

          await newReader.save();    
        return newReader;
      } catch (error) {
        throw error;
      }
}
export async function  softDeleteDB(id:number){
    try {
        const reader = await Reader.findOneOrFail({
            where: { reader_id: id },
          });
      
          await reader.softRemove();
          
        return reader;
      } catch (error) {
        throw error;
      }
}
