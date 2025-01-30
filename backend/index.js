const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const port = 3003;
const chatRoutes = require("./routes/chatRoutes");
// const imageRoutes = require("./routes/imageRouter");

connect(
  process.env.MONGODB_URI
).then(()=>{
  console.log("Connected to the database");
});

app.use(cors({origin:["http://localhost:3000","https://kriti2025-pi.vercel.app"]}));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the KRITI 2025</h1>");

}
);
app.use("/api/chats", chatRoutes);
// app.use("/images", imageRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
