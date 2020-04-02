const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path"); //core nodejs module

const items = require("./routes/api/items");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//Body PArser
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDb connected....."))
  .catch(err => console.log("Cannot connect to db due to " + err));

app.use("/api/items", items);

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
