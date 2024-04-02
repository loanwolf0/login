const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");

const app = express();
dotenv.config();

// Mongo Db connection
connectDB();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", userRouter);

// listen
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `server running ${process.env.NODE_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
