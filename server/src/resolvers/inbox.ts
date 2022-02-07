import { Inbox } from "../entities/Inbox";
import { Mutation, Resolver } from "type-graphql";

@Resolver()
export class InboxResolver {
    @Mutation(() => Inbox)
    createInbox() : Promise<Inbox> {
        return Inbox.create({}).save();
    }
}