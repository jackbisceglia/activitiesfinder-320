import express from "express";
import userDataLayer from "./data/user.js";
import userRouter from "./routes/users.js";

// init app
const app = express();
const port = 8080;

// middleware
// none as of now

// subrouters
// routers exported from files in /routes will be defined here
// eg. all routes beginning with /user will be handled by userRouter
app.use("/user", userRouter);

// test route: GET request to http://localhost:8080/
app.get("/", async (req, res) => {
  res.send("Hello World!");
});

// start server listening at port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
