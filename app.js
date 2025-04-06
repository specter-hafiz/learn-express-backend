require("dotenv").config();
require("express-async-errors");
const express = require("express");
// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

app.get("/", (req, res) => {
  res.send("Jobs API");
});
const app = express();
const authenticateUser = require("./middleware/authentication");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// connectDB
const connectDB = require("./db/connect");
app.set("trust proxy", 1); // trust first proxy
// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
app.use(express.json());
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 })); // 15 minutes

app.use(helmet());
app.use(cors());
app.use(xss());
// app.use(express.static("./public")); // for serving static files

// extra packages

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
