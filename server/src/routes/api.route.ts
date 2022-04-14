import { NextFunction, Request, Response } from "express";
import { start } from "repl";
const router = require("express").Router();
const { google } = require("googleapis");


router.get("/", async (req: Request, res: Response) => {
  res.send({ message: "API IS WORK!!" });
  console.log(req);
});

router.post(
  "/create-tokens",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.body;
      const response = await oauth2client.getToken(code);
      res.send(response);

      // then save the user's refresh token to the database.

      // to create an event, get refresh token from user database

      console.log("API WORKS!!");
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/get-daily-events",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { date } = req.body;
      // const minDateTime = date.concat("T00:00:00Z");
      const minDateTime = new Date(date);
      const maxDateTime = new Date(date);
      maxDateTime.setUTCHours(23, 59, 59);

      console.log(minDateTime);
      console.log(maxDateTime);

      // const maxDateTime = date.concat("T:23:59:59");
      // const maxDateTime = date.concat("T:23:59:59-7:00");

      console.log(new Date(minDateTime));

      oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN }); // for each user

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
      const { summary, description, location, startDateTime, endDateTime } =
        req.body;

      oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN }); // for each user

      const calendar = google.calendar("v3"); // v3 api for google calendar

      const response = await calendar.events.insert({
        auth: oauth2client,
        calendarId: "primary", // dependent on the user's calendars.
        requestBody: {
          // all from the frontend
          summary: summary,
          description: description,
          location: location,
          colorId: "6",
          start: {
            dateTime: new Date(startDateTime),
          },
          end: {
            dateTime: new Date(endDateTime),
          },
        },
      });

      res.send(response);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
