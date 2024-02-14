import {
  ManyToOne,
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { validate } from 'class-validator'

@Entity('object')
export class ObjectEntity extends BaseEntity {
  // async save(options?: any): Promise<this> {
  //   const errors = await validate(this);

  //   if (errors.length > 0) {
  //     throw new Error('Validation failed. Errors: ' + errors.map(error => error.toString()).join(', '));
  //   }
  //     return super.save(options);
  // }

  @PrimaryGeneratedColumn()
  id: number

  @DeleteDateColumn()
  dateDeleted: Date
}
