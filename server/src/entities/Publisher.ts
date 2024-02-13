import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import { Book } from './Book'
import { BookInstance } from './BookInstance'

@Entity('publisher')
export class Publisher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  country: string

  @DeleteDateColumn()
  dateDeleted: Date

  @OneToMany(() => BookInstance, (book) => book.publisher)
  bookinstances: BookInstance[]
}
