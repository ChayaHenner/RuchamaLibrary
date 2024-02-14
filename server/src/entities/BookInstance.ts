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
import { IsString, IsEmail, MinLength, MaxLength, IsDate, IsEnum, IsNumber, Max } from 'class-validator';

@Entity('bookinstance')
export class BookInstance extends BaseEntity {
  @PrimaryGeneratedColumn()
  bookCode: number

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Column()
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
  category: number

  @DeleteDateColumn()
  dateDeleted: Date

  @OneToMany(() => Book, (book) => book.bookCode) //, { eager: true })
  books: Book[]

  constructor() {
    super()
  }
}
