import { Reader } from '../entities/Reader'
import { FindManyOptions ,ILike } from 'typeorm';

 
export async function  getReadersDB(searchTerm:string){
   
      const options: FindManyOptions<Reader> = {};
      if (searchTerm) {
        options.where = {
          name: ILike(`%${searchTerm}%`),
        };
      }
  
      const readers = await Reader.find(options);     
        return readers;
     
}
export async function  postReaderDB(reader:any){
  
        const newReader = Reader.create({
            name: reader.name,
            email:reader.email,
           dob: new Date(reader.dob),
          });

          await newReader.save();    
        return newReader;
     
}
export async function  softDeleteDB(id:number){
    
        const reader = await Reader.findOneOrFail({
            where: { reader_id: id },
          });
      
          await reader.softRemove();
          
        return reader;
     
}
