const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const fs = require("fs");
const cron = require("node-cron");

require('dotenv').config()

// Models
const Inspection = require("./models/Inspection");

// API Routes
const authRoute = require("./routes/api/authenticate");
const vinRoute = require("./routes/api/vin");
const inspectionRoute = require("./routes/api/inspection");
const vehicleRoute = require("./routes/api/vehicle");

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
app.use("/api/vehicle", vehicleRoute);

const port = process.env.PORT || 5000;

const server = app.listen(port, async () => {
  console.log(`Server up and running on port ${port} !`);
});


// cron.schedule("0 */15 * * * *", async () => {
cron.schedule("* * * * *", async () => {
  let photPaths = [];
  const vehiclePhotoFolder = path.join(__dirname, '../../uploads', 'vehicle_photos');
  const inspectionPhotos = await Inspection.distinct("photos");
  if (inspectionPhotos.length === 0) return;
  for (let i = 0; i < inspectionPhotos.length; i ++) {
    if (!inspectionPhotos[i]) continue;
    for (let photoKey in inspectionPhotos[i]) {
      photPaths.push(`${inspectionPhotos[i][photoKey]}`);
    }
  }
  console.log(vehiclePhotoFolder);
  fs.readdirSync(vehiclePhotoFolder).forEach(file => {
    console.log(file);
  });
});