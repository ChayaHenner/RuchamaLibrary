import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import { Borrowing } from './Borrowing'
import { ObjectEntity } from './Object'
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsDate,
} from 'class-validator'

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
