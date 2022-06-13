const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

require('dotenv').config()

// API Routes
const authRoute = require("./routes/api/authenticate");
const vinRoute = require("./routes/api/vin");
const inspectionRoute = require("./routes/api/inspection");

const app = express();
app.use(cors());
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(express.static(__dirname + "/"));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Routes
app.use("/api/authenticate", authRoute);
app.use("/api/inspection", inspectionRoute);
app.use("/api/vin", vinRoute);

const port = process.env.PORT || 5000;

const server = app.listen(port, async () => {
  console.log(`Server up and running on port ${port} !`);
});