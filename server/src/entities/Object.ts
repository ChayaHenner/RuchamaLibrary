import {
  BaseEntity,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('object')
export class ObjectEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @DeleteDateColumn()
  dateDeleted: Date
}
