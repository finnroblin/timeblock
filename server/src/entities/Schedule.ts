import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Block } from "./Block";

@ObjectType()
@Entity()
export class Schedule extends BaseEntity {
	
    // we're really only going to have one inbox that's persisstent through the lifetime of the program
    @Field()
	@PrimaryGeneratedColumn()
	id!: number;

    @Field()
	@Column({ default: "TODAYs SCHEDULE "})
	title!: String;

    
    @OneToMany(() => Block, block => block.schedule )
    blocks: Block[];

}