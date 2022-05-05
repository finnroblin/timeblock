
import { Redis } from "ioredis"
import { Request, Response } from "express";
import { Session, SessionData} from "express-session";
// import { createUserLoader } from "./utils/createUserLoader";
// import { createUpdootLoader } from "./utils/createUpdootLoader";


export type MyContext = {
    
    // req: Request & { session: Session & Partial<SessionData> & { userId : number } };
    // req: Request & { session: Express.Session };
    req: Request & {
        session: Session & Partial<SessionData> & { userId?: number };
      };    
    // req: Request & {
    //     session: Session & Partial<SessionData>;
    //   };    
    // req: Request & { session: { userId: string }};
    res: Response;
    redis: Redis;
    // userLoader: ReturnType<typeof createUserLoader>;
    // updootLoader: ReturnType<typeof createUpdootLoader>;
};