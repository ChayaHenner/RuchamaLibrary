import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  MinLength
} from 'class-validator'
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { LevelCategory } from '../enum/bookInstance.enum'
import { Book } from './Book'
import { Publisher } from './Publisher'

@Entity('bookinstance')
export class BookInstance extends BaseEntity {
  @PrimaryGeneratedColumn()
  bookCode: number

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Column({ nullable: true })
  name: string

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Column()
  author: string

  @ManyToOne(() => Publisher, (publisher) => publisher.id, { eager: true })
  @JoinColumn()
  publisher: Publisher

  @IsNumber()
  @Max(1000)
  @Column()
  price: number

  @IsEnum(LevelCategory)
  @Column({
    type: 'enum',
    enum: LevelCategory,
  })
  category: LevelCategory

  @DeleteDateColumn()
  dateDeleted: Date

  @OneToMany(() => Book, (book) => book.bookCode) //, { eager: true })
  books: Book[]

  constructor() {
    super()
  }
}
