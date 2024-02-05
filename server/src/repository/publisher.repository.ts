import { libraryData } from '../app';
import { Publisher } from '../entities/Publisher'


export async function getPublishersDB() {
    
        // const publishers = await Publisher.find();
        const publishers = await libraryData.getRepository(Publisher)
            .createQueryBuilder('publisher')
            .select(['publisher.publisher_id', 'publisher.publisher_name'])
            .getMany();

        return publishers;
    
}
export async function postPublisherDB(publisher: any) {
 
        const newPublisher = Publisher.create({
            publisher_name: publisher.publisher_name,
            country: publisher.country
        });

        await newPublisher.save();
        return newPublisher;
    
}
export async function softDeleteDB(id: number) {
  
        const publisher = await Publisher.findOneOrFail({
            where: { publisher_id: id },
        });

        await publisher.softRemove();

        return publisher;
    
}
