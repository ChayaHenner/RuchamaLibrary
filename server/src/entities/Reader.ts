import {
  IsDate,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import {
  Column,
  Entity,
  OneToMany
} from 'typeorm'
import { Borrowing } from './Borrowing'
import { ObjectEntity } from './Object'

@Entity('reader')
export class Reader extends ObjectEntity {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Column()
  name: string

  @IsEmail()
  @Column()
  email: string

  @IsDate()
  @Column()
  dob: Date

  @OneToMany(() => Borrowing, (borrowing) => borrowing.reader)
  borrowings: Borrowing[]
}
