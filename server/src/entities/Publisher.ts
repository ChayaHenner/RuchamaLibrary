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
import { ObjectEntity } from './Object'

@Entity('publisher')
export class Publisher extends ObjectEntity {

  @Column()
  name: string

  @Column({ nullable: true })
  country: string

  @OneToMany(() => BookInstance, (book) => book.publisher)
  bookinstances: BookInstance[]
}
