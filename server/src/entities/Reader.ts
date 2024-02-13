import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import { Borrowing } from './Borrowing'
import { ObjectEntity } from './Object'

@Entity('reader')
export class Reader extends ObjectEntity {

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  dob: Date

  @OneToMany(() => Borrowing, (borrowing) => borrowing.reader)
  borrowings: Borrowing[]

}
