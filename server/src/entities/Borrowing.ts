import {TableForeignKey, ManyToOne, JoinColumn, BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"
import { Book } from './Book'
import { Reader } from './Reader'
@Entity('borrowing')
export class Borrowing extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(
        () => Reader,
        reader => reader.reader_id,{eager:true}
    )
    @JoinColumn({
        name: 'reader_id'
    })
    reader_id!: Reader 

    @ManyToOne(
        () => Book,
        book =>book.book_id,{eager:true}
    )
    @JoinColumn({
        name:'book_id'
    })
    book_id!: Book 


    @CreateDateColumn()
    date_borrowed!: Date


    @Column({ default: null, nullable: true })
    date_returned!: Date
}