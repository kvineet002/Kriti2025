const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const port = 3002;
const conversationRoutes = require("./routes/conversationRoutes");

connect(
  process.env.MONGODB_URI
).then(()=>{
  console.log("Connected to the database");
});

app.use(cors({origin:'*'}));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the KRITI 2025</h1>");

}
);
// app.use("/api/conversations", conversationRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
