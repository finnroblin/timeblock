"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv-safe/config");
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const user_1 = require("./resolvers/user");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const block_1 = require("./resolvers/block");
const inbox_1 = require("./resolvers/inbox");
const schedule_1 = require("./resolvers/schedule");
const main = async () => {
    let retries = 5;
    while (retries) {
        try {
            const conn = await (0, typeorm_1.createConnection)({
                type: "postgres",
                url: process.env.DB_HOST,
            });
            console.log(process.env.DB_HOST, process.env.REDIS_HOST);
            break;
        }
        catch (err) {
            console.log("ERROR: ", err);
            console.log(process.env.DB_HOST, process.env.REDIS_HOST);
            retries -= 1;
            console.log("RETRIES LEFT: ", retries);
            await new Promise((res) => setTimeout(res, 3000));
        }
    }
    const app = (0, express_1.default)();
    let RedisStore = require("connect-redis")(express_session_1.default);
    retries = 5;
    while (retries > 0) {
        try {
            const redis = new ioredis_1.default(process.env.REDIS_HOST);
            app.set("trust proxy", 1);
            app.use((0, cors_1.default)({
                origin: "http://localhost:3000",
                credentials: true,
            }));
            app.use((0, express_session_1.default)({
                name: constants_1.COOKIE_NAME,
                store: new RedisStore({
                    client: redis,
                    disableTouch: true,
                }),
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                    httpOnly: true,
                    sameSite: "lax",
                    secure: false
                },
                saveUninitialized: false,
                secret: process.env.SESSION_SECRET,
                resave: false,
            }));
            const apolloServer = new apollo_server_express_1.ApolloServer({
                schema: await (0, type_graphql_1.buildSchema)({
                    resolvers: [
                        user_1.UserResolver,
                        block_1.BlockResolver,
                        inbox_1.InboxResolver,
                        schedule_1.ScheduleResolver,
                    ],
                    validate: false,
                }),
                context: ({ req, res }) => ({ req, res, redis }),
            });
            await apolloServer.start();
            apolloServer.applyMiddleware({
                app,
                cors: false,
            });
            console.log("OUR REDIS OBJECT: ");
            console.log(redis);
            break;
        }
        catch (err) {
            console.log("redis error, retries remaining: ", retries);
            console.log(err);
            console.log("REDIS HOST: ", process.env.REDIS_HOST);
            retries -= 1;
            await new Promise((res) => setTimeout(res, 3000));
        }
    }
    app.use(express_1.default.json());
    app.use("/api", require("./routes/api.route"));
    app.listen(8080, () => {
        console.log("server started on port 8080, redis env: ", process.env.REDIS_HOST, " postgres env: ", process.env.DB_HOST);
        console.log("11:12 build,v2");
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map