import { Schedule } from "../entities/Schedule";
import { Mutation, Resolver } from "type-graphql";

@Resolver()
export class ScheduleResolver {
    @Mutation(() => Schedule)
    createSchedule() : Promise<Schedule> {
        return Schedule.create({}).save();
    }
}