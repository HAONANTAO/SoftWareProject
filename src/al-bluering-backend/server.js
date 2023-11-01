const express = require("express");
const cors = require("cors");

const app = express();

const env = "DEP";

const corsOptions = {
  origin: env === "DEV" ? "http://localhost" : "http://13.239.40.255",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// link to routes
const administratorRoute = require("./routes/administratorRoute");
const materialRoute = require("./routes/materialRoute");
const coacherRoute = require("./routes/coacherRoute");
const ageGroupRoute = require("./routes/ageGroupRoute");
const moduleRoute = require("./routes/moduleRoute");

app.use("/admin", administratorRoute);
app.use("/material", materialRoute);
app.use("/coacher", coacherRoute);
app.use("/ageGroup", ageGroupRoute);
app.use("/module", moduleRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
