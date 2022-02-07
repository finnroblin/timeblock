import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Block } from "./Block";

@ObjectType()
@Entity()
export class Inbox extends BaseEntity {
	
    // we're really only going to have one inbox that's persisstent through the lifetime of the program
    @Field()
	@PrimaryGeneratedColumn()
	id!: number;

    @Field()
	@Column({ default: "MAIN INBOX"})
	title!: String;

    
    @OneToMany(() => Block, block => block.inbox )
    blocks: Block[];

}