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
import { Book } from './Book'
import { Publisher } from './Publisher'
import { LevelCategory } from '../enum/bookInstance.enum'

@Entity('bookinstance')
export class BookInstance extends BaseEntity {
  @PrimaryGeneratedColumn()
  bookCode: number

  @Column()
  name: string

  @Column()
  author: string

  @ManyToOne(() => Publisher, (publisher) => publisher.id, { eager: true })
  @JoinColumn()
  publisher: Publisher

  @Column()
  price: number

  @Column({
    type: 'enum',
    enum: LevelCategory,
  })
  category: number

  @DeleteDateColumn()
  dateDeleted: Date

  @OneToMany(() => Book, (book) => book.bookCode) //, { eager: true })
  books: Book[]

  constructor() {
    super()
  }
}
