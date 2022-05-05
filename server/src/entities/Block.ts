import { userInfo } from "os";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Inbox } from "./Inbox";
import { Schedule } from "./Schedule";
import { User } from "./User";
// import { ScalarDateTypeDefinition } from 'graphql-scalars'

// import { User } from "./User";

@ObjectType()
@Entity()
export class Block extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  title!: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: String;

  //  want to either default these to a specific time in the date they were created,
  // or have a seperate object for Blocks before they are created (not the best idea)
  @Field(() => Date, { nullable: true })
  @Column({ 
    nullable: true })
  startDateTime?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  endDateTime?: Date ;

  @Field(() => Date, {nullable: true})
  @Column({nullable: true})
  date?: Date;

  // @Field()
  // @Column()
  // creatorId: number;

  @ManyToOne(() => User, user => user.blocks)
  user: User;

  @Field()
  @Column({nullable: true})
  creatorId?: number;

  @Field()
  @Column({ nullable: true })
  inboxId: number;

  @ManyToOne(() => Inbox, (inbox) => inbox.blocks)
  inbox: Inbox;

  @Field()
  @Column({ nullable: true })
  scheduleId: number;

  @Field()
  @Column({nullable: true})
  isComplete: boolean;

  @ManyToOne(() => Schedule, (schedule) => schedule.blocks)
  schedule: Schedule;
}
