import { Reader } from '../entities/Reader';
import { FindManyOptions, ILike ,Equal} from 'typeorm';

export const getReadersDB = async (searchTerm: string) => {
  const options: FindManyOptions<Reader> = {};
  if (searchTerm) {
    options.where = [
      { name: ILike(`%${searchTerm}%`) },
      { email: ILike(`%${searchTerm}%`) },
      // { id: Equal(Number(searchTerm)) },
    ] };

 return await Reader.find(options);
};

export const postReaderDB = async (reader: any) => {
  return Reader.save({
    name: reader.name,
    email: reader.email,
    dob: new Date(reader.dob),
  });
};

export const softDeleteDB = async (id: number) => {
  const reader = await Reader.findOneOrFail({
    where: {  id },
  });
  return await reader.softRemove();
};
