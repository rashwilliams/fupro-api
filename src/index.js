const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./api/routes/auth");
const usersRoute = require("./api/routes/user");
const postRoute = require("./api/routes/post");
const categoryRoute = require("./api/routes/category");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const cors = require("cors");

dotenv.config();

const PORT = 3001;

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://fupro.vercel.app/",
// ];

const corsOption = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "X-Auth-Token",
    "Authorization",
    "Accept-Encoding",
    "Connection",
    "Content-Length",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: allowedOrigins,
  preflightContinue: false,
};

mongoose
  .connect(process.env.MONG0_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/post", postRoute);
app.use("/api/category", categoryRoute);

// app.use("/", (req, res) => {
//   console.log("This is the main url");
// });

app.listen(PORT, () => {
  console.log("server is running");
});
