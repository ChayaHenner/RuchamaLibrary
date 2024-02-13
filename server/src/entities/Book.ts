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
import { BookInstance } from './BookInstance'
import { Borrowing } from './Borrowing'

@Entity('book')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => BookInstance, (bookinstance) => bookinstance.bookCode, {
    eager: true,
  })
  @JoinColumn()
  bookCode: BookInstance

  @Column({
    default: false,
  })
  bookTaken: boolean

  @DeleteDateColumn()
  dateDeleted: Date
  
  @OneToMany(() => Borrowing, (borrowing) => borrowing.book)
  borrowings: Borrowing[]
}
