import { ManyToOne, BaseEntity, Column, Entity, PrimaryGeneratedColumn, DeleteDateColumn, JoinColumn } from "typeorm"
import { Book } from "./Book"
import { Publisher } from "./Publisher"
export enum LevelCategory{
    Children='Children',
    Teens ='Teens',
    Adults ='Adults',
    Academic ='Academic'
}


@Entity('bookinstance')
export class BookInstance extends BaseEntity {

    @PrimaryGeneratedColumn()
    book_code!: number

    @Column()
    book_name!: string

    @Column()
    author!: string

    @ManyToOne(
        () => Publisher,
        publisher =>publisher.publisher_id ,{eager:true}
    )
    @JoinColumn({
        name:'publisher_id'
    })
    publisher_id!: Publisher 


    @Column()
    price!: number

    @Column({
        type:"enum",
        enum: LevelCategory
    })
    category!: number

    // @OneToMany( 
    //     () => Book,
    //     book=>book.bookinstance
    // )
    // books:Book[]

}