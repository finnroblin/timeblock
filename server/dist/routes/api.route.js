"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const { google } = require("googleapis");
router.get("/", async (req, res) => {
    res.send({ message: "API IS WORK!!" });
    console.log(req);
});
router.post("/create-tokens", async (req, res, next) => {
    try {
        const { code } = req.body;
        const response = await oauth2client.getToken(code);
        res.send(response);
        console.log("API WORKS!!");
    }
    catch (err) {
        next(err);
    }
});
router.post("/get-daily-events", async (req, res, next) => {
    try {
        const { date } = req.body;
        const minDateTime = new Date(date);
        const maxDateTime = new Date(date);
        maxDateTime.setUTCHours(23, 59, 59);
        console.log(minDateTime);
        console.log(maxDateTime);
        console.log(new Date(minDateTime));
        oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });
        const calendar = google.calendar("v3");
        const response = await calendar.events.list({
            auth: oauth2client,
            calendarId: "primary",
            singleEvents: true,
            timeMax: maxDateTime,
            timeMin: minDateTime,
        });
        res.send(response);
    }
    catch (err) {
        next(err);
    }
});
router.post("/create-event", async (req, res, next) => {
    try {
        const { summary, description, location, startDateTime, endDateTime } = req.body;
        oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });
        const calendar = google.calendar("v3");
        const response = await calendar.events.insert({
            auth: oauth2client,
            calendarId: "primary",
            requestBody: {
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
    }
    catch (err) {
        next(err);
    }
});
module.exports = router;
//# sourceMappingURL=api.route.js.map