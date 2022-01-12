const express = require("express");
const app = express();
const port = 1234;
const { google } = require("googleapis");
const request = require("request");
const cors = require("cors");
const urlParse = require("url-parse");
const queryParse = require("query-string");
const bodyParse = require("body-parser");
const axios = require("axios");

//363258436565-7j5ct78tb8faegshvjhnkvgafv4oog7r.apps.googleusercontent.com
//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

app.use(cors());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

app.get("/getURLTing", (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
    //client id
    "363258436565-7j5ct78tb8faegshvjhnkvgafv4oog7r.apps.googleusercontent.com",
    //client secret
    "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",
    //link to redirect to
    "http://localhost:1234/"
    )
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: JSON.stringify({
            callbackUrl: req.body.callbackUrl,
            userID: req.body.userid
        })
    })

    request(url, (err, response, body) => {
        console.log("error: ", err);
        console.log("statusCode: ", response && response.statusCode);
        res.send({ url });
    });
});

app.get("/steps", (req,res) => {
    const queryURL = new urlParse(req.url);
    const code = queryParse.parse(queryURL.query).code;
    const oauth2Client = new google.auth.OAuth2(
        //client id
        "363258436565-7j5ct78tb8faegshvjhnkvgafv4oog7r.apps.googleusercontent.com",
        //client secret
        "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",
        //link to redirect to
        "http://localhost:1234/"
    );

    const tokens = await oauth2Client.getToken(code)
    console.log(tokens);
});


app.listen(port, () => console.log('GOOGLE MAPS IS WATCHING ON PORT ${port}'));
