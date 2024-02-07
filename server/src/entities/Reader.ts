import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,DeleteDateColumn } from "typeorm"

@Entity('reader')
export class Reader extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    dob: Date;

    @DeleteDateColumn()
    dateDeleted: Date

}