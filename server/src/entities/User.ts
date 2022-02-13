import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Block } from "./Block";
import { Inbox } from "./Inbox";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@Column({ unique: true })
	username!: String;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

	@OneToMany(() => Block, block => block.user)
	blocks: Block[];

    @OneToOne(() => Inbox, inbox => inbox.user)
    inbox: Inbox;
}