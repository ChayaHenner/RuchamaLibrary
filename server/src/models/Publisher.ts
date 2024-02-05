import {BaseEntity, Column, Entity, PrimaryGeneratedColumn,DeleteDateColumn} from "typeorm"

@Entity('publisher')
export class Publisher extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    publisher_id!:number 
    
    @Column()
    publisher_name!:string 
    
    @Column({ nullable: true })
    country!:string 
   
    @DeleteDateColumn()
    date_deleted!:Date
}
