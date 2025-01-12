const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const port = 3002;


connect(
  process.env.MONGODB_URI
).then(()=>{
  console.log("Connected to the database");
});

app.use(cors({origin:'*'}));
app.use(bodyParser.json());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
