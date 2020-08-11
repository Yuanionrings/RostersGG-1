require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");

const users = require("./routes/api/users");
const rosters = require("./routes/api/rosters");
const events = require("./routes/api/events");
const app = express();

console.log('----- [SERVER] -----');
if(process.env.NODE_ENV === 'development'){
    console.log('[SERVER] This server is in DEVELOPMENT mode, will not send confirmation emails on user reg!!');
}

// Bodyparser middleware for routes to accept JSON
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cors());


// Connect to MongoDB
const mongodb_conn = process.env.MONGODB_URI || 'mongodb://localhost:27017/rosters-gg';
mongoose
    .connect(mongodb_conn, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log(`[SERVER] MongoDB successfully connected [${mongodb_conn}]`))
    .catch(err => console.log(err));

// To get rid of annoying Mongoose deprecation warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);


// Routes Configuration
app.use("/api/users", users);
app.use("/api/rosters", rosters);
app.use("/api/events", events);

// Check if application is in production (Heroku)
if (process.env.NODE_ENV === 'production') {
    //console.log("[SERVER] Now using express.static(client/build)");
    app.use(express.static("client/build"));

    // If no backend routes are hit, send React client app
    app.get('*', (req, res) => {
        console.log(`[SERVER] Sending file: ${path.join(__dirname, 'client/build/index.html')}`);
        res.sendFile(path.join(__dirname, 'client/build/index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`[SERVER] Server up and running on port ${port}`);
});