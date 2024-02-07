import { TableForeignKey, ManyToOne, JoinColumn, BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"
import { Book } from './Book'
import { Reader } from './Reader'
@Entity('borrowing')
export class Borrowing extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        () => Reader,
        reader => reader.id, { eager: true }
    )
    @JoinColumn()
    reader: Reader

    @ManyToOne(
        () => Book,
        book => book.id, { eager: true }
    )
    @JoinColumn()
    book: Book


    @CreateDateColumn()
    date_borrowed: Date


    @Column({ default: null, nullable: true })
    date_returned: Date
}