import { libraryData } from '../app';
import { Publisher } from '../models/Publisher'


export async function getPublishersDB() {
    try {
        // const publishers = await Publisher.find();
        const publishers = await libraryData.getRepository(Publisher)
            .createQueryBuilder('publisher')
            .select(['publisher.publisher_id', 'publisher.publisher_name'])
            .getMany();

        return publishers;
    } catch (error) {
        throw error;
    }
}
export async function postPublisherDB(publisher: any) {
    try {
        const newPublisher = Publisher.create({
            publisher_name: publisher.publisher_name,
            country: publisher.country
        });

        await newPublisher.save();
        return newPublisher;
    } catch (error) {
        throw error;
    }
}
export async function softDeleteDB(id: number) {
    try {
        const publisher = await Publisher.findOneOrFail({
            where: { publisher_id: id },
        });

        await publisher.softRemove();

        return publisher;
    } catch (error) {
        throw error;
    }
}
