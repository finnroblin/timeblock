// import { Field, ObjectType } from "type-graphql";
// import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { Block } from "./Block";

// @ObjectType()
// @Entity()
// export class User extends BaseEntity {
// 	@Field()
// 	@PrimaryGeneratedColumn()
// 	id!: number;

// 	@Field(() => String)
// 	@CreateDateColumn()
// 	createdAt: Date;

// 	@Field()
// 	@Column({ unique: true })
// 	username!: String;



// 	@OneToMany(() => Block, block => block.user)
// 	blocks: Block[];
// }