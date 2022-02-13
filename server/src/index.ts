import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express';
// import { User } from "./entities/User";
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";
import path from "path";
import { BlockResolver } from "./resolvers/block";
import { Block } from "./entities/Block";
import { Inbox } from "./entities/Inbox";
import { Schedule } from "./entities/Schedule";
import { InboxResolver } from "./resolvers/inbox";
import { ScheduleResolver } from "./resolvers/schedule";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";
const main = async() => {
    const _conn = await createConnection({
        type: "postgres",
        database: 'tblock1',
        username: "postgres",
        password: "test",
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [Block, Inbox, Schedule, User]
    });
    // await Block.delete({});
    const app = express();
        
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, BlockResolver, ScheduleResolver, InboxResolver, UserResolver],
            validate: false,
        }),
        context: ({  res }) => ({
            
            res
        })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app }); // creates express graphql endpoint
    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
}

main().catch((err) => {console.log(err);});

console.log("hello world");