const express = require("express");

const app = express();

const currentDate = new Date();
const dayOfWeek = currentDate.getDay();
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDay = daysOfWeek[dayOfWeek];


// Get the individual components (year, month, day, hour, minute, second)
//const year = currentDate.getUTCFullYear();
//const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
//const day = String(currentDate.getUTCDate()).padStart(2, "0");
//const hour = String(currentDate.getUTCHours()).padStart(2, "0");
//const minute = String(currentDate.getUTCMinutes()).padStart(2, "0");
//const second = String(currentDate.getUTCSeconds()).padStart(2, "0");

// Create the formatted UTC time string
//const formattedUTC = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;

const utcString = currentDate.toISOString().replace(/.\d+Z$/g, "Z").padStart(2, "0");


app.get("/api", (req, res) => {
    return res.json({
        "slack_name": req.query.slack_name,
        "current_day": currentDay,
        "utc_time": utcString,
        "track": req.query.track,
        "github_file_url": "https://github.com/adelekewest/hng-stage1/app.js",
        "github_repo_url": "https://github.com/adelekewest/hng-stage1",
        "status_code": res.statusCode
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
});