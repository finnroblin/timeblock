"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
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
const User_1 = require("./entities/User");
const user_1 = require("./resolvers/user");
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./constants");
const dotenv = require('dotenv').config({ path: './.env' });
const main = async () => {
    const _conn = await (0, typeorm_1.createConnection)({
        type: "postgres",
        database: "tblock1",
        username: "postgres",
        password: "test",
        logging: true,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [Block_1.Block, Inbox_1.Inbox, Schedule_1.Schedule, User_1.User],
    });
    const app = (0, express_1.default)();
    app.set("trust proxy", true);
    let RedisStore = require("connect-redis")(express_session_1.default);
    const redis = new ioredis_1.default("127.0.0.1:6379");
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use("/api", require("./routes/api.route"));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: false,
            sameSite: "lax",
            secure: false,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [
                hello_1.HelloResolver,
                block_1.BlockResolver,
                schedule_1.ScheduleResolver,
                inbox_1.InboxResolver,
                user_1.UserResolver,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map