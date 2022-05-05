import "reflect-metadata"
import "dotenv-safe/config"

import { COOKIE_NAME, __prod__ } from "./constants";

import express from "express"
import {ApolloServer} from 'apollo-server-express'
import { buildSchema } from "type-graphql";

import { UserResolver } from "./resolvers/user";

import Redis from 'ioredis';
import session from 'express-session';
// import connectRedis from 'connect-redis'
// import { MyContext } from "./types";
import cors from "cors";
import { User } from "./entities/User";

import path from "path";
// import { sendEmail } from "./utils/sendEmail";

import { createConnection } from "typeorm";

// import { createUserLoader } from "./utils/createUserLoader";
// import { createUpdootLoader } from "./utils/createUpdootLoader";
import { Block } from "./entities/Block";
import { Inbox } from "./entities/Inbox";
import { Schedule } from "./entities/Schedule";
import { BlockResolver } from "./resolvers/block";
import { InboxResolver } from "./resolvers/inbox";
import { ScheduleResolver } from "./resolvers/schedule";

 
const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        database: 'rclone2',
        username: 'postgres',
        password: 'test',
        // url: process.env.DATABASE_URL,
        // url: "postgresql://postgres:test@localhost:5432/lireddit2",
        logging: true, 
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [ Block, Inbox, Schedule, User],
    });
    // conn
    await conn.runMigrations();

    // await Post.delete({});

    const app = express();


    let RedisStore = require('connect-redis')(session);
    // const redisClient = redis.createClient();
    // const redisPassword = "password"; 
    const redis = new Redis(
    //     {host: 'host.docker.internal', 
    //     port:6379,
    //     password: 'T'
    // }
        // process.env.REDIS_URL
        // "127.0.0.1:6379"
        "127.0.0.1:7777"

        // "0.0.0.0:6379"

        );

    // redis.auth(password: 'password' () => ());
    app.set("proxy", 1);
    app.use(cors({
        // origin: "*",
        // origin: process.env.CORS_ORIGIN,
        origin: "http://localhost:3000",
        // origin: "http://localhost:4000/graphql",
        // origin: 'https://studio.apollographql.com',
        credentials: true,
        // access-control-allow-origin: "https://studio.apollographql.com",
        // access-control-allow-credentials: true,
    }));
    
    app.use(
      session({
        name: COOKIE_NAME,
        store: new RedisStore({ 
            // client: redisClient,
            client: redis,
            disableTouch: true,            
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
            httpOnly: true, // can't access cookie from javascript frontend
            sameSite: "lax", // csrf something (good to google)
            secure: __prod__, // if secure then cookie only works in https (localhost is not https)
            // domain: __prod__ ? ".customdomain.com" : undefined, // replace with my custom domain
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
      })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, BlockResolver, InboxResolver, ScheduleResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis,
           
        }), // is assessible by all resolvers
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ 
        app,
        cors: false,
    });
    app.use(express.json());
     app.use("/api", 
     require("./routes/api.route")
     );

    app.listen(
        // parseInt(process.env.PORT)
        4000
        , () => { // set listener on 
        console.log('server started on localhost:4000')
    });
};

main().catch((err) => {
    console.error(err);
});
