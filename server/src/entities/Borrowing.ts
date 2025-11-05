import { IsDate } from 'class-validator'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Book } from './Book'
import { Reader } from './Reader'
@Entity('borrowing')
export class Borrowing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Reader, (reader) => reader.id, { eager: true })
  @JoinColumn()
  reader: Reader

  @ManyToOne(() => Book, (book) => book.id, { eager: true })
  @JoinColumn()
  book: Book

  @IsDate()
  @CreateDateColumn()
  dateBorrowed: Date

  @IsDate()
  @Column({ default: null, nullable: true })
  dateReturned: Date

  @OneToMany(() => Book, (book) => book.id)
  books: Book[]
}
