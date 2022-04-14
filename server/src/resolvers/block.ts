import { Block } from "../entities/Block";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { getBeginningOfDay} from "../utils/getBeginningOfDay";
import {getEndOfDay } from "../utils/getEndOfDay";

@InputType()
class BlockInput {
  @Field()
  title: string;
  @Field()
  description: string;
  // @Field()
  // startDateTime: Date | null;
  // @Field()
  // endDateTime: Date | null;
  // @Field()
  // inboxId: number | null;
  // @Field()
  // scheduleId: number | null;
}

@Resolver()
export class BlockResolver {
  // add functions inside
  @Query(() => [Block])
  async blocks(
    @Arg("date", () => String, { nullable: true }) date: string | null
  ): Promise<Block[]> {

    if (!date) {
      console.log("NO DATE SENT!!!!!");
      return Block.find({});
    }
    console.log(" date from resolver:");
    console.log(date);
    // beginning of dayL 
    
    const beginningOfDay = getBeginningOfDay(date);
    const endOfDay = getEndOfDay(date);
    // const replacements: any[] = [new Date(parseInt(date))];
    const replacements: any[] = [beginningOfDay, endOfDay];
    console.log(replacements);
    // want to query with the date range:
    /*  
        x < EOD(date)
        and x > EOD(date-1)
        we have several variables to work with:
        - startDateTime
        - endDateTime
    */ 
    const blocks = await getConnection().query(
      `
      select b.*
      from block b
      where b."startDateTime" > $1 and b."startDateTime" < $2
      `,
      replacements
    );
    return blocks;
  }

  @Query(() => [Block])
  async unassignedBlocks (

  ) : Promise<Block[]> {
    const blocks = await getConnection().query(
      `
      select b.*
      from block b
      where b."startDateTime" is null or b."endDateTime" is null
      `
    )
    return blocks;
  }

  @Mutation(() => Block)
  async createBlock(@Arg("input") input: BlockInput): Promise<Block> {
    // if Block's start date time and end date time are null,
    // then insert them into the inbox.

    return Block.create({ ...input, inboxId: 1, isComplete: false }).save();
  }

  // updates the startTime and endTime of the block
  @Mutation(() => Block)
  async updateBlockTimes(
    @Arg("id", () => Int) id: number,
    @Arg("startDateTime") startDateTime: Date,
    @Arg("endDateTime") endDateTime: Date
  ): Promise<Block | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Block)
      .set({ startDateTime, endDateTime })
      .where("id = :id ", {
        id,
      })
      .returning("*")
      .execute();
    console.log("result: ", result);
    return result.raw[0];
  }

  @Mutation(() => Block)
  async setBlock(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: BlockInput,
    @Arg("startDateTime") startDateTime: Date,
    @Arg("endDateTime") endDateTime: Date
  ): Promise<Block | null> {
    const title = input.title;
    const description = input.description;
    const result = await getConnection()
      .createQueryBuilder()
      .update(Block)
      .set({ startDateTime, endDateTime, title, description })
      .where("id = :id ", {
        id,
      })
      .returning("*")
      .execute();
    console.log("result: ", result);
    return result.raw[0];
  }



  @Query(() => Block, { nullable: true })
  block(@Arg("id", () => Int) id: number): Promise<Block | undefined> {
    return Block.findOne(id);
  }

  // @Query(() => Date, { nullable: true })
  // blockStartTime(
  //   @Arg("id", () => Int) id: number

  // ) : Promise<Date | undefined> {
  //   const result = await getConnection()
  //   .createQueryBuilder()
  //   .getMany()
  //   .select('startDateTime').where('id = :id ', { id})
  //   .returning('*')
  //   .execute();

  //   return result.raw[0];
  // }
}
