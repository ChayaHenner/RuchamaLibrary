import { ManyToOne, BaseEntity, Column, Entity, PrimaryGeneratedColumn, DeleteDateColumn, JoinColumn } from "typeorm"
import { BookInstance } from './BookInstance'
@Entity('book')
export class Book extends BaseEntity {

    @PrimaryGeneratedColumn()
    book_id!: number

    @ManyToOne(
        () => BookInstance,
        bookinstance => bookinstance.book_code, { eager: true }
    )
    @JoinColumn({
        name: 'book_code'
    })
    book_code!: BookInstance 

    @Column({
        default: false
    })
    book_taken!: boolean

}