"use strict";
const user_1 = require("../resolvers/user");
const parseToGoogleDateTime_1 = require("../utils/parseToGoogleDateTime");
const router = require("express").Router();
const { google } = require("googleapis");
const oauth2client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "http://localhost:3000");
const REFRESH_TOKEN = process.env.SAMPLE_REFRESH_TOKEN;
router.get("/", async (req, res) => {
    res.send({ message: "API IS WORK!!" });
    console.log(req);
});
router.post("/create-tokens", async (req, res, next) => {
    try {
        console.log("IN CREATE TOKENS");
        console.log(req.body);
        const { code, userId } = req.body;
        const response = await oauth2client.getToken(code);
        const resolver = new user_1.UserResolver();
        console.log(response);
        console.log(response.data);
        if (typeof response.data !== 'undefined' && typeof response.data.refresh_token !== 'undefined') {
            console.log("refresh token found");
            const resultOfRefreshLog = resolver.setRefreshToken(response.data.refresh_token, userId).then((result) => {
                result ?
                    console.log("Set new refresh token for user: ", userId, " with value: ", response.data.refresh_token) :
                    (console.log("Failed when Setting new refresh token for user: ", userId));
            });
        }
        res.send(response);
        console.log("API WORKS!!");
    }
    catch (err) {
        next(err);
    }
});
router.post("/get-daily-events", async (req, res, next) => {
    try {
        const { date, refresh } = req.body;
        const minDateTime = new Date(date);
        const maxDateTime = new Date(date);
        minDateTime.setUTCHours(0, 0, 0);
        maxDateTime.setUTCHours(23, 59, 59);
        console.log(minDateTime);
        console.log(maxDateTime);
        console.log(new Date(minDateTime));
        oauth2client.setCredentials({ refresh_token: refresh });
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
        console.log(req.body);
        const { title, description, location, sdt, edt, refresh } = req.body;
        oauth2client.setCredentials({ refresh_token: refresh });
        const calendar = google.calendar("v3");
        console.log("dateTime: ", sdt);
        console.log("DateTIMe: ", edt);
        console.log(title);
        console.log(description);
        const response = await calendar.events.insert({
            auth: oauth2client,
            calendarId: "primary",
            requestBody: {
                summary: title,
                description: description,
                colorId: "6",
                start: {
                    dateTime: (0, parseToGoogleDateTime_1.parseToGoogleDateTime)(sdt),
                },
                end: {
                    dateTime: (0, parseToGoogleDateTime_1.parseToGoogleDateTime)(edt),
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