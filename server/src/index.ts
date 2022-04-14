import "reflect-metadata";
// import "dotenv"
import { createConnection } from "typeorm";
import express from "express";
// import { User } from "./entities/User";
import Redis from "ioredis";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
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
import cors from "cors";
import { COOKIE_NAME } from "./constants";
import { truncateSync } from "fs";

const dotenv = require('dotenv').config({path:'./.env'});

const main = async () => {
  const _conn = await createConnection({
    type: "postgres",
    database: "tblock1",
    username: "postgres",
    password: "test",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Block, Inbox, Schedule, User],
  });
  // await Block.delete({});
  const app = express();
  app.set("trust proxy", true);
  //   //    !process.env.NODE_ENV === "production");
  //   app.set("Access-Control-Allow-Origin", "https://studio.apollographql.com");
  //   app.set("Access-Control-Allow-Credentials", true);
  let RedisStore = require("connect-redis")(session);
  // const redisClient = redis.createClient();
  // const redisPassword = "password";
  const redis = new Redis("127.0.0.1:6379");
  app.use(express.json());
  app.use(
    cors({
      // origin: "*",
      //   origin: process.env.CORS_ORIGIN,
      origin: "http://localhost:3000",
      // origin: "http://localhost:4000/graphql",
      //   origin: 'https://studio.apollographql.com', // uncomment this if you want it to work for apollographql sandbox
      credentials: true,
      // access-control-allow-origin: "https://studio.apollographql.com",
      // access-control-allow-credentials: true,
    })
  );

  // app.get("/", async (req, res) => {
  //   res.send({ message: "awesome it works" });
  //   console.log(req);
  // });

  app.use("/api", require("./routes/api.route"));

  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   console.log(req);
  //   next();
  // });

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
        httpOnly: false, // can't access cookie from javascript frontend
        //   sameSite: "lax", // csrf something (good to google)
        sameSite: "lax",
        secure: false, // if secure then cookie only works in https (localhost is not https)
        // domain: __prod__ ? ".customdomain.com" : undefined, // replace with my custom domain
      },
      saveUninitialized: false,
      // secret: "oisfhdsaugiokuizknhadsumg",
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        BlockResolver,
        ScheduleResolver,
        InboxResolver,
        UserResolver,
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
  apolloServer.applyMiddleware({ app, cors: false }); // creates express graphql endpoint
  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
