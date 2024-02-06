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
    bookCode!: number

    @Column()
    name!: string

    @Column()
    author!: string

    @ManyToOne(
        () => Publisher,
        publisher =>publisher.id ,{eager:true}
    )
    @JoinColumn()
    publisher!: Publisher 

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