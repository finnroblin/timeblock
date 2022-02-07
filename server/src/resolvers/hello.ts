import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
    // add functions inside
    @Query(() => String)
    hello() {
        return "hello world";
    }
}