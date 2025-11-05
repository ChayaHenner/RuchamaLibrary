import { IsBoolean } from 'class-validator'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { BookInstance } from './BookInstance'
import { Borrowing } from './Borrowing'
import { ObjectEntity } from './Object'

@Entity('book')
export class Book extends ObjectEntity {
  @ManyToOne(() => BookInstance, (bookinstance) => bookinstance.bookCode, {
    eager: true,
  })
  @JoinColumn()
  bookCode: BookInstance

  @IsBoolean()
  @Column({
    default: false,
  })
  bookTaken: boolean

  @OneToMany(() => Borrowing, (borrowing) => borrowing.book)
  borrowings: Borrowing[]
}
