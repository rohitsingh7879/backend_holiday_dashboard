require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const database = require("./config/database");
const routes = require("./app/Http/routes");

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://16.170.107.234/dashboard1/",
  "http://16.170.107.234/Holiday/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(database.mongodb.uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Mongodb is connected...");
  })
  .catch((err) => {
    console.log("Mongodb is not connected...", err);
  });

app.use("/holiday/", routes);
app.listen(process.env.PORT, () => {
  console.log(`Server is started on Port ${process.env.PORT}`);
});

app.get("/holiday_dashboard_health", (req, res) => {
  res
    .status(200)
    .json({ message: "Working", data: "", success: true, status: 200 });
});

app.use((req, res, next) => {
  res
    .status(404)
    .json({ message: "Page not Found", data: "", success: true, status: 404 });
});
