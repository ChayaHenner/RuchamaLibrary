import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import { Borrowing } from './Borrowing'

@Entity('reader')
export class Reader extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  dob: Date

  @DeleteDateColumn()
  dateDeleted: Date

  @OneToMany(() => Borrowing, (borrowing) => borrowing.reader)
  borrowings: Borrowing[]

  // constructor() {
  //   super()
  // }
}
