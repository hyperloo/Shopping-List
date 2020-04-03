const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path"); //core nodejs module
const config = require("config");

const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Body PArser
app.use(bodyParser.json());

//Because Express now has it's own bodyParser, therefore, we write
//app.use(express.json()); //But express used to add and remove multiple times in upgrades, so we use bodyParser

//DB Config
// const db = require("./config/keys").mongoURI;   //Before using config, we simply use this method of getting keys from config/keys.js
const db = config.get("mongoURI"); //It get mongoURI from default.json and then config it.

//Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDb connected....."))
  .catch(err => console.log("Cannot connect to db due to " + err));

app.use("/api/items", items);
app.use("/api/register", users);
app.use("/api/auth", auth);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set a static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

//Connect to port
app.listen(port, () => console.log(`Server Started on port ${port}`));
//   .catch(err => console.log(`Server not started due to ${err}`));
