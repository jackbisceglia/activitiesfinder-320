import cors from "cors";
// import userRouter from "./routes/users.js";
import eventRouter from "./routes/callEvents.js";
import express from "express";

// init app
const app = express();
const port = 8080;

// middleware
app.use(cors());

// subrouters
// routers exported from files in /routes will be defined here
// eg. all routes beginning with /user will be handled by userRouter
// app.use("/user", userRouter);

// test route: GET request to http://localhost:8080/

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.use("/events", eventRouter);

// start server listening at port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
