import { Inbox } from "../entities/Inbox";
import { Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "src/types";

@Resolver()
export class InboxResolver {
    @Mutation(() => Inbox)
    createInbox(
        @Ctx() { req }: MyContext
    ) : Promise<Inbox> {
        return Inbox.create({
            creatorId: req.session.userId,
        }).save();
    }
}