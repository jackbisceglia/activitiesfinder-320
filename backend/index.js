import Clerk from "@clerk/clerk-sdk-node/esm/instance";
import { config } from "dotenv";
import cors from "cors";
import eventRouter from "./routes/callEvents.js";
import express from "express";
import userRouter from "./routes/callUsers.js";
config({ path: "./.env.local" });

// init app
const port = process.env.PORT || 8080;
const app = express();

const secretKey = process.env.CLERK_SECRET_KEY;
// console.log("Key: ", secretKey);

const clerk = new Clerk({ secretKey: secretKey });
// middleware for all routes
app.use(cors());
app.use(express.json());

// routers exported from files in /routes will be defined here
// eg. all routes beginning with /user will be handled by userRouter
// app.use("/user", userRouter);
// test route: GET request to http://localhost:8080/
app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.use(clerk.expressRequireAuth({})); // protect all following routes

// subrouters
app.use("/events", eventRouter);

app.use("/users", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

// start server listening at port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
