import {
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'
import {
  Column,
  Entity,
  OneToMany
} from 'typeorm'
import { BookInstance } from './BookInstance'
import { ObjectEntity } from './Object'

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
  @Column() //{ nullable: true })
  country: string

  @OneToMany(() => BookInstance, (book) => book.publisher)
  bookinstances: BookInstance[]
}
