require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");

const users = require("./routes/api/users");
const rosters = require("./routes/api/rosters");
const app = express();


// Bodyparser middleware for routes to accept JSON
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cors());


// Connect to MongoDB
const mongodb_conn = process.env.MONGODB_PROD_URI || process.env.MONGODB_DEV_URI;
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


// Routes
app.use("/api/users", users);
app.use("/api/rosters", rosters);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "client", "build")))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

//console.log(process.env);

const port = process.env.SERVER_PROD_PORT || process.env.SERVER_DEV_PORT;
app.listen(port, () => {
    console.log('----- [SERVER] -----');
    console.log(`[SERVER] Server up and running on port ${port}`);
});