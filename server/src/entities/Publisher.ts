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
import { IsString, IsEmail, MinLength, MaxLength, IsDate } from 'class-validator';

@Entity('publisher')
export class Publisher extends ObjectEntity {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Column()
  name: string
  
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Column()//{ nullable: true })
  country: string

  @OneToMany(() => BookInstance, (book) => book.publisher)
  bookinstances: BookInstance[]
}
