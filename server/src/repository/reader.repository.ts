import { Reader } from '../entities/Reader';
import { FindManyOptions, ILike ,Equal} from 'typeorm';

export const getReadersDB = async (searchTerm: string) => {
  const options: FindManyOptions<Reader> = {};
  if (searchTerm) {
    options.where = [
      { name: ILike(`%${searchTerm}%`) },
      { email: ILike(`%${searchTerm}%`) },
      // { reader_id: Equal(Number(searchTerm)) },
    ] };

 return await Reader.find(options);
};

export const postReaderDB = async (reader: any) => {
  const newReader = Reader.create({
    name: reader.name,
    email: reader.email,
    dob: new Date(reader.dob),
  });

  await newReader.save();
  return newReader;
};

export const softDeleteDB = async (id: number) => {
  const reader = await Reader.findOneOrFail({
    where: { reader_id: id },
  });
  return await reader.softRemove();
};
