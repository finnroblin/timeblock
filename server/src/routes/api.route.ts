import { gql } from "apollo-server-express";
import { NextFunction, Request, Response } from "express";
import { start } from "repl";
import { User } from "../entities/User";
import { UserResolver } from "../resolvers/user";
// import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from ".env"
import { parseToGoogleDateTime } from "../utils/parseToGoogleDateTime";
const router = require("express").Router();
const { google } = require("googleapis");

const oauth2client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000"
);

/*
res: config: {method: 'POST', url: 'https://oauth2.googleapis.com/token', data: 'code=4%2F0AX4XfWjooWI67qkq8hSRC1sVAfN-cOCc2o4VYB8f…3000&grant_type=authorization_code&code_verifier=', headers: {…}, body: 'code=4%2F0AX4XfWjooWI67qkq8hSRC1sVAfN-cOCc2o4VYB8f…3000&grant_type=authorization_code&code_verifier=', …}data: access_token: "ya29.A0ARrdaM9kej4Hp2hjLCUAnB9fU9r12qQcGpftWpGc4QhPRhHkzLJNgGd8NQRP4GvvUNMcYi5EgrIMBJOVtPnOK1tMCYHxUNDA6LE_9rmES1xzDHhAjgD2kMy4MtFiOiLXnFsX4DTvOojVeHSTsbkiG7wKzC99"expiry_date: 1649953126229id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYxMzM4Y2EyNjgzNTg2M2Y2NzE0MDhmNDE3MzhhN2I0OWU3NDBmYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1OTc2MDI4MzczOTEtbjE2MzI0Y2ZlZXZtdGhibGRuZTc4NHBrZThuMDVxMmUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1OTc2MDI4MzczOTEtbjE2MzI0Y2ZlZXZtdGhibGRuZTc4NHBrZThuMDVxMmUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY0OTA1Njg1MDMzMTQ3ODM3NTYiLCJlbWFpbCI6ImZpbm4ucy5yb2JsaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI0M2pJaUtzWkxNYjFfMmRvSHctbTNnIiwibmFtZSI6IkZpbm4gUm9ibGluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnpxY1FVQVZiUFNyZnNrZURjRGRmeUJkOFd4MU1QTTRvd3BSMDkxPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkZpbm4iLCJmYW1pbHlfbmFtZSI6IlJvYmxpbiIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjQ5OTQ5NTI4LCJleHAiOjE2NDk5NTMxMjh9.Awy0D1zqCV--Zn1KSux8m0m8_Rujh-OEjBJfVETi4754moWWGurZufRh-Ki25BJyJHBWb82cahIlf_yVGNTqsdlAi6RiC21TXwbqO7yEqkICuorRdOne8FBq35yA_yPashblZgS_GrC_eD3aJOZrq4l-CTxGeWz8AuQaOh4i-RtP0f-yR_R-dZZlIuJtGOv5b74Ku4jDxfnfDuYkKcm2xe38oRyQStrFdoaKhgz4TxGco06iyKoG4CpZRDkQ6cAt8pyQS2HlDHpdwhgZDM-uZMhqOCWoR3_51-6yDV5nhESszS7tLYd0RN0rTnsBPHKnIJ1RYKr4GGXCHHr5etP-yA"rt: "1//04K8rwljtCrQyCgYIARAAGAQSNwF-L9Irn-wNnu83hWDl3g8cHN8hqE2a_ES57UYE0TSkor_WIWpzUmCjqRkulzIY7V5ZKKKqKuE"scope: "https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar"token_type: "Bearer"[[Prototype]]: Objectheaders: alt-svc: "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000,h3-Q050=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000,quic=\":443\"; ma=2592000; v=\"46,43\""cache-control: "no-cache, no-store, max-age=0, must-revalidate"connection: "close"content-encoding: "gzip"content-type: "application/json; charset=utf-8"date: "Thu, 14 Apr 2022 15:18:48 GMT"expires: "Mon, 01 Jan 1990 00:00:00 GMT"pragma: "no-cache"server: "scaffolding on HTTPServer2"transfer-encoding: "chunked"vary: "Origin, X-Origin, Referer"x-content-type-options: "nosniff"x-frame-options: "SAMEORIGIN"x-xss-protection: "0"[[Prototype]]: Objectrequest: {responseURL: 'https://oauth2.googleapis.com/token'}status: 200statusText: "OK"[[Prototype]]: Objecttokens: access_token: "ya29.A0ARrdaM9kej4Hp2hjLCUAnB9fU9r12qQcGpftWpGc4QhPRhHkzLJNgGd8NQRP4GvvUNMcYi5EgrIMBJOVtPnOK1tMCYHxUNDA6LE_9rmES1xzDHhAjgD2kMy4MtFiOiLXnFsX4DTvOojVeHSTsbkiG7wKzC99"expiry_date: 1649953126229id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYxMzM4Y2EyNjgzNTg2M2Y2NzE0MDhmNDE3MzhhN2I0OWU3NDBmYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1OTc2MDI4MzczOTEtbjE2MzI0Y2ZlZXZtdGhibGRuZTc4NHBrZThuMDVxMmUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1OTc2MDI4MzczOTEtbjE2MzI0Y2ZlZXZtdGhibGRuZTc4NHBrZThuMDVxMmUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY0OTA1Njg1MDMzMTQ3ODM3NTYiLCJlbWFpbCI6ImZpbm4ucy5yb2JsaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI0M2pJaUtzWkxNYjFfMmRvSHctbTNnIiwibmFtZSI6IkZpbm4gUm9ibGluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnpxY1FVQVZiUFNyZnNrZURjRGRmeUJkOFd4MU1QTTRvd3BSMDkxPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkZpbm4iLCJmYW1pbHlfbmFtZSI6IlJvYmxpbiIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjQ5OTQ5NTI4LCJleHAiOjE2NDk5NTMxMjh9.Awy0D1zqCV--Zn1KSux8m0m8_Rujh-OEjBJfVETi4754moWWGurZufRh-Ki25BJyJHBWb82cahIlf_yVGNTqsdlAi6RiC21TXwbqO7yEqkICuorRdOne8FBq35yA_yPashblZgS_GrC_eD3aJOZrq4l-CTxGeWz8AuQaOh4i-RtP0f-yR_R-dZZlIuJtGOv5b74Ku4jDxfnfDuYkKcm2xe38oRyQStrFdoaKhgz4TxGco06iyKoG4CpZRDkQ6cAt8pyQS2HlDHpdwhgZDM-uZMhqOCWoR3_51-6yDV5nhESszS7tLYd0RN0rTnsBPHKnIJ1RYKr4GGXCHHr5etP-yA"rt: "1//04K8rwljtCrQyCgYIARAAGAQSNwF-L9Irn-wNnu83hWDl3g8cHN8hqE2a_ES57UYE0TSkor_WIWpzUmCjqRkulzIY7V5ZKKKqKuE"scope: "https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar"token_type: "Bearer"[[Prototype]]: Object[[Prototype]]: Object
index.tsx?19a0:29 in index
index.tsx?19a0:37 Thu Apr 14 2022 11:18:48 GMT-0400 (Eastern Daylight Time)
Schedule.tsx?c964:96 EVLIST::
Schedule.tsx?c964:97 []
*/

const REFRESH_TOKEN = process.env.SAMPLE_REFRESH_TOKEN;

router.get("/", async (req: Request, res: Response) => {
  res.send({ message: "API IS WORK!!" });
  console.log(req);
});

      
// if having refresh token troubles, checK: https://stackoverflow.com/questions/28564758/oauth2client-gettoken-missing-refresh-token
router.post(
  "/create-tokens",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("IN CREATE TOKENS")
      // console.log(req)

      console.log(req.body)
      const { code, userId } = req.body;
      const response = await oauth2client.getToken(code);
      const resolver = new UserResolver();
      console.log(response);
      console.log(response.data);
      if (typeof response.data !== 'undefined' && typeof response.data.refresh_token !== 'undefined') {
        console.log("refresh token found")
        // then the first time the user has signed in.
        const resultOfRefreshLog = resolver.setRefreshToken(response.data.refresh_token,
          userId
        ).then((result) => {
          result ? 
          console.log("Set new refresh token for user: ", userId, " with value: ", response.data.refresh_token) :
           (console.log("Failed when Setting new refresh token for user: ", userId))
        });       
      }
    
      
      res.send(response);

      // then save the user's refresh token to the database.

      // to create an event, get refresh token from user database
      // res.send('POST request to the homepage')

      console.log("API WORKS!!");
    } catch (err) {
      next(err);
    }
  }
);

/*

{
    "url": "https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&timeMax=2022-04-14T23%3A59%3A59.000Z&timeMin=2022-04-14T00%3A00%3A00.000Z",
    "method": "GET",
    "userAgentDirectives": [
        {
            "product": "google-api-nodejs-client",
            "version": "5.1.0",
            "comment": "gzip"
        }
    ],
    "headers": {
        "x-goog-api-client": "gdcl/5.1.0 gl-node/16.13.0 auth/7.14.1",
        "Accept-Encoding": "gzip",
        "User-Agent": "google-api-nodejs-client/5.1.0 (gzip)",
        "Authorization": "Bearer ya29.A0ARrdaM9-QBi8Brrw3AgN4LScYbHYC4pEm5yiYvUWZ4bpQcwYBhQfmqR5gCl8mzMf9PAiuRgoa40Gy1cyuULf6VfvBo25J_4s5rnntT0J6FQEzhIjQn8Q57Y9nJ56LLFmAbpFODgO1x6vKqJ8zGPSQwf1DThD-A",
        "Accept": "application/json"
    },
    "params": {
        "singleEvents": true,
        "timeMax": "2022-04-14T23:59:59.000Z",
        "timeMin": "2022-04-14T00:00:00.000Z"
    },
    "retry": true,
    "responseType": "json"
}


{
    "kind": "calendar#events",
    "etag": "\"p338djus3qq9fe0g\"",
    "summary": "finner.roblin@gmail.com",
    "updated": "2022-04-14T04:03:30.722Z",
    "timeZone": "America/Detroit",
    "accessRole": "owner",
    "defaultReminders": [
        {
            "method": "popup",
            "minutes": 30
        }
    ],
    "nextSyncToken": "CNDZ-4PWkvcCENDZ-4PWkvcCGAUgpfSW0gE=",
    "items": [
        {
            "kind": "calendar#event",
            "etag": "\"3299818020666000\"",
            "id": "1oprrvs7jo1j12kb2fvnscqhau",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=MW9wcnJ2czdqbzFqMTJrYjJmdm5zY3FoYXUgZmlubmVyLnJvYmxpbkBt",
            "created": "2022-04-14T04:03:30.000Z",
            "updated": "2022-04-14T04:03:30.333Z",
            "summary": "some event",
            "creator": {
                "email": "finner.roblin@gmail.com",
                "self": true
            },
            "organizer": {
                "email": "finner.roblin@gmail.com",
                "self": true
            },
            "start": {
                "dateTime": "2022-04-14T06:00:00-04:00",
                "timeZone": "America/Detroit"
            },
            "end": {
                "dateTime": "2022-04-14T07:45:00-04:00",
                "timeZone": "America/Detroit"
            },
            "iCalUID": "1oprrvs7jo1j12kb2fvnscqhau@google.com",
            "sequence": 0,
            "reminders": {
                "useDefault": true
            },
            "eventType": "default"
        }
    ]
}


*/

router.post(
  "/get-daily-events",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { date, refresh } = req.body;
      // const minDateTime = date.concat("T00:00:00Z");
      const minDateTime = new Date(date);
      const maxDateTime = new Date(date);
      minDateTime.setUTCHours(0,0,0);
      maxDateTime.setUTCHours(23, 59, 59);

      console.log(minDateTime);
      console.log(maxDateTime);

      // const maxDateTime = date.concat("T:23:59:59");
      // const maxDateTime = date.concat("T:23:59:59-7:00");

      console.log(new Date(minDateTime));

      oauth2client.setCredentials({ refresh_token: refresh }); // for each user

      const calendar = google.calendar("v3"); // v3 api for google calendar

      const response = await calendar.events.list({
        auth: oauth2client,
        calendarId: "primary",
        singleEvents: true,
        timeMax: maxDateTime,
        // // maxDateTime,
        // // timeMin: minDateTime,
        //  {
        //   dateTime: new Date(date).toISOString(),
        // },
        timeMin: minDateTime,

        // timeMin: {
        //   dateTime: new Date(Date.parse(minDateTime)),
        // },
        // requestBody: {
        //   timeMax: {
        //     dateTime: new Date(maxDateTime),
        //   },
        //   timeMin: {
        //     dateTime: new Date(minDateTime),
        //   },
        // }
      });

      res.send(response);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/create-event",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req);
      console.log(req.body);
      const { title, description, location, sdt, edt, refresh } =
        req.body;

      // oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN }); // for each user
      oauth2client.setCredentials({ refresh_token: refresh }); // for each user

      const calendar = google.calendar("v3"); // v3 api for google calendar
      console.log("dateTime: ", sdt);
      console.log("DateTIMe: ", edt);
      console.log(title);
      console.log(description);
      // sdt = "2022-04-14T12:00:00-04:00";
      // edt = "2022-04-14T13:00:00-04:00";
      const response = await calendar.events.insert({
        auth: oauth2client,
        calendarId: "primary", // dependent on the user's calendars.
        requestBody: {
          // all from the frontend
          summary: title,
          description: description,
          // location: location,
          colorId: "6",
          start: {
            // dateTime: "2022-04-14T12:00:00-04:00",
            // dateTime: (new Date(sdt)),
            dateTime: parseToGoogleDateTime(sdt),

          }, 
          end: {
            // dateTime: "2022-04-14T13:00:00-04:00",
            dateTime: parseToGoogleDateTime(edt),

            // new Date(endDateTime),
          },
        },
      });

      res.send(response);
    } catch (err) {
      next(err);
    }
  }
);

// module.exports = router;
export = router;
// res: config: {method: 'POST', 
// url: 'https://oauth2.googleapis.com/token', 
// data: 'code=4%2F0AX4XfWjooWI67qkq8hSRC1sVAfN-cOCc2o4VYB8f…3000&grant_type=authorization_code&code_verifier=',
//  headers: {…}, 
//  body: 'code=4%2F0AX4XfWjooWI67qkq8hSRC1sVAfN-cOCc2o4VYB8f…3000&grant_type=authorization_code&code_verifier=', …}
//  data: 
//  access_token: "ya29.A0ARrdaM9kej4Hp2hjLCUAnB9fU9r12qQcGpftWpGc4QhPRhHkzLJNgGd8NQRP4GvvUNMcYi5EgrIMBJOVtPnOK1tMCYHxUNDA6LE_9rmES1xzDHhAjgD2kMy4MtFiOiLXnFsX4DTvOojVeHSTsbkiG7wKzC99"
//  expiry_date: 1649953126229
//  id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYxMzM4Y2EyNjgzNTg2M2Y2NzE0MDhmNDE3MzhhN2I0OWU3NDBmYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1OTc2MDI4MzczOTEtbjE2MzI0Y2ZlZXZtdGhibGRuZTc4NHBrZThuMDVxMmUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1OTc2MDI4MzczOTEtbjE2MzI0Y2ZlZXZtdGhibGRuZTc4NHBrZThuMDVxMmUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY0OTA1Njg1MDMzMTQ3ODM3NTYiLCJlbWFpbCI6ImZpbm4ucy5yb2JsaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI0M2pJaUtzWkxNYjFfMmRvSHctbTNnIiwibmFtZSI6IkZpbm4gUm9ibGluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnpxY1FVQVZiUFNyZnNrZURjRGRmeUJkOFd4MU1QTTRvd3BSMDkxPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkZpbm4iLCJmYW1pbHlfbmFtZSI6IlJvYmxpbiIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjQ5OTQ5NTI4LCJleHAiOjE2NDk5NTMxMjh9.Awy0D1zqCV--Zn1KSux8m0m8_Rujh-OEjBJfVETi4754moWWGurZufRh-Ki25BJyJHBWb82cahIlf_yVGNTqsdlAi6RiC21TXwbqO7yEqkICuorRdOne8FBq35yA_yPashblZgS_GrC_eD3aJOZrq4l-CTxGeWz8AuQaOh4i-RtP0f-yR_R-dZZlIuJtGOv5b74Ku4jDxfnfDuYkKcm2xe38oRyQStrFdoaKhgz4TxGco06iyKoG4CpZRDkQ6cAt8pyQS2HlDHpdwhgZDM-uZMhqOCWoR3_51-6yDV5nhESszS7tLYd0RN0rTnsBPHKnIJ1RYKr4GGXCHHr5etP-yA"
//  rt: "1//04K8rwljtCrQyCgYIARAAGAQSNwF-L9Irn-wNnu83hWDl3g8cHN8hqE2a_ES57UYE0TSkor_WIWpzUmCjqRkulzIY7V5ZKKKqKuE"
//  scope: "https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar"
//  token_type: "Bearer"[[Prototype]]: 
//  Objectheaders: alt-svc: "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000,h3-Q050=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000,quic=\":443\"; ma=2592000; v=\"46,43\""
//  cache-control: "no-cache, no-store, max-age=0, must-revalidate"connection: "close"
//  content-encoding: "gzip"content-type: "application/json; charset=utf-8"
//  date: "Thu, 14 Apr 2022 15:18:48 GMT"
//  expires: "Mon, 01 Jan 1990 00:00:00 GMT"
//  pragma: "no-cache"
//  server: "scaffolding on HTTPServer2"transfer-encoding: "chunked"vary: "Origin, X-Origin, Referer"
//  x-content-type-options: "nosniff"
//  x-frame-options: "SAMEORIGIN"
//  x-xss-protection: "0"[[Prototype]]: 
//  Objectrequest: {responseURL: 'https://oauth2.googleapis.com/token'}
//  status: 200statusText: "OK"[[Prototype]]: Objecttokens: 
//  access_token: "ya29.A0ARrdaM9kej4Hp2hjLCUAnB9fU9r12qQcGpftWpGc4QhPRhHkzLJNgGd8NQRP4GvvUNMcYi5EgrIMBJOVtPnOK1tMCYHxUNDA6LE_9rmES1xzDHhAjgD2kMy4MtFiOiLXnFsX4DTvOojVeHSTsbkiG7wKzC99"
//  expiry_date: 1649953126229
//  id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYxMzM4Y2EyNjgzNTg2M2Y2NzE0MDhmNDE3MzhhN2I0OWU3NDBmYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1OTc2MDI4MzczOTEtbjE2MzI0Y2ZlZXZtdGhibGRuZTc4NHBrZThuMDVxMmUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1OTc2MDI4MzczOTEtbjE2MzI0Y2ZlZXZtdGhibGRuZTc4NHBrZThuMDVxMmUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY0OTA1Njg1MDMzMTQ3ODM3NTYiLCJlbWFpbCI6ImZpbm4ucy5yb2JsaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI0M2pJaUtzWkxNYjFfMmRvSHctbTNnIiwibmFtZSI6IkZpbm4gUm9ibGluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnpxY1FVQVZiUFNyZnNrZURjRGRmeUJkOFd4MU1QTTRvd3BSMDkxPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkZpbm4iLCJmYW1pbHlfbmFtZSI6IlJvYmxpbiIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjQ5OTQ5NTI4LCJleHAiOjE2NDk5NTMxMjh9.Awy0D1zqCV--Zn1KSux8m0m8_Rujh-OEjBJfVETi4754moWWGurZufRh-Ki25BJyJHBWb82cahIlf_yVGNTqsdlAi6RiC21TXwbqO7yEqkICuorRdOne8FBq35yA_yPashblZgS_GrC_eD3aJOZrq4l-CTxGeWz8AuQaOh4i-RtP0f-yR_R-dZZlIuJtGOv5b74Ku4jDxfnfDuYkKcm2xe38oRyQStrFdoaKhgz4TxGco06iyKoG4CpZRDkQ6cAt8pyQS2HlDHpdwhgZDM-uZMhqOCWoR3_51-6yDV5nhESszS7tLYd0RN0rTnsBPHKnIJ1RYKr4GGXCHHr5etP-yA"
//  rt: "1//04K8rwljtCrQyCgYIARAAGAQSNwF-L9Irn-wNnu83hWDl3g8cHN8hqE2a_ES57UYE0TSkor_WIWpzUmCjqRkulzIY7V5ZKKKqKuE"
//  scope: "https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar"
//  token_type: "Bearer"[[Prototype]]: Object[[Prototype]]: Object
