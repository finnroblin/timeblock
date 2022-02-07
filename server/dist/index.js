"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const path_1 = __importDefault(require("path"));
const block_1 = require("./resolvers/block");
const Block_1 = require("./entities/Block");
const Inbox_1 = require("./entities/Inbox");
const Schedule_1 = require("./entities/Schedule");
const inbox_1 = require("./resolvers/inbox");
const schedule_1 = require("./resolvers/schedule");
const main = async () => {
    const _conn = await (0, typeorm_1.createConnection)({
        type: "postgres",
        database: 'tblock1',
        username: "postgres",
        password: "test",
        logging: true,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [Block_1.Block, Inbox_1.Inbox, Schedule_1.Schedule]
    });
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, block_1.BlockResolver, schedule_1.ScheduleResolver, inbox_1.InboxResolver],
            validate: false,
        }),
        context: ({ res }) => ({
            res
        })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
};
main().catch((err) => { console.log(err); });
console.log("hello world");
//# sourceMappingURL=index.js.map