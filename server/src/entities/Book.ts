import {
  ManyToOne,
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm'
import { BookInstance } from './BookInstance'

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
}
