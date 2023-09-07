const express = require("express");

const app = express();

const currentDate = new Date();
const dayOfWeek = currentDate.getDay();
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDay = daysOfWeek[dayOfWeek];

const year = currentDate.getUTCFullYear();
const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
const day = currentDate.getUTCDate().toString().padStart(2, '0');
const hour = currentDate.getUTCHours().toString().padStart(2, '0');

// Generate a random number between -2 and 2 (representing minutes)
const randomMinutes = Math.floor(Math.random() * 5) - 2;

// Apply the random adjustment to the current time
currentDate.setUTCMinutes(currentDate.getUTCMinutes() + randomMinutes);

// Format the adjusted UTC time as a string
const formattedMinutes = currentDate.toISOString().slice(0, 19) + 'Z';

// Create the formatted UTC time string
const formattedUTC = `${year}-${month}-${day}T${hour}:${formattedMinutes}`;


app.get("/api", (req, res) => {
    return res.json({
        "slack_name": req.query.slack_name,
        "current_day": currentDay,
        "utc_time": formattedUTC,
        "track": req.query.track,
        "github_file_url": "https://github.com/adelekewest/hng-stage1/app.js",
        "github_repo_url": "https://github.com/adelekewest/hng-stage1",
        "status_code": res.statusCode
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
});