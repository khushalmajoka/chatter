const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute")
const chatRoute = require("./routes/chatRoute")
const messageRoute = require("./routes/messageRoute")

const app = express();
require("dotenv").config();

app.use(express.json());

const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET, POST, PUT, DELETE',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get('/', (req, res) => {
    res.send("Welcome to our chat app API!")
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening on port: " + port);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => console.log("Error connecting to Database: " + err));
