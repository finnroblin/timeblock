import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Block } from "./Block";
import { Inbox } from "./Inbox";
// import { Post } from "./Post";
// import { Updoot } from "./Updoot";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // @OneToMany( () => Post, (post) => post.creator )
  // posts: Post[];

  // @OneToMany( () => Updoot, (updoot) => updoot.user )
  // updoots: Updoot[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ unique: true, nullable: true })
  refresh_token: string;

  @OneToMany(() => Block, (block) => block.user)
  blocks: Block[];

  @OneToOne(() => Inbox, (inbox) => inbox.user)
  inbox: Inbox;
}
