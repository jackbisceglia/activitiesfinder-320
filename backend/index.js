import cors from "cors";
// import userRouter from "./routes/users.js";
import eventRouter from "./routes/callEvents.js";

// import "./config.env"; // To read CLERK_API_KEY
// require('dotenv').config({ path: './config.env' });

import { config } from 'dotenv';
config({ path: './config.env' });
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

import express from "express";

// init app
const port = process.env.PORT || 8080;
const app = express();


const apiKey = process.env.CLERK_SECRET_KEY;
console.log("Key: " , apiKey);

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

// Use the lax middleware that returns an empty auth object when unauthenticated
app.get(
  "/protected-endpoint",
  ClerkExpressWithAuth({
    // ...options
  }),
  (req, res) => {
    res.json(req.auth);
  }
);

app.use("/events", eventRouter);

// start server listening at port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
