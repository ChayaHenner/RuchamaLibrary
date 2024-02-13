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
  import { BookInstance } from './BookInstance'
  import { Borrowing } from './Borrowing'
  
  @Entity('object')
  export class ObjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
  
    @DeleteDateColumn()
    dateDeleted: Date 
  }
  