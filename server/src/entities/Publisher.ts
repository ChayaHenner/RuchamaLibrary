import {BaseEntity, Column, Entity, PrimaryGeneratedColumn,DeleteDateColumn} from "typeorm"

@Entity('publisher')
export class Publisher extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id!:number 
    
    @Column()
    name!:string 
    
    @Column({ nullable: true })
    country!:string 
   
    @DeleteDateColumn()
    dateDeleted!:Date
}
