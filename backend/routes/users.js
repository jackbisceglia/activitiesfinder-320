import express from "express";

// Here lives all user related route handlers
// eg. GET request to http://localhost:8080/user would be handled here

// init router
const userRouter = express.Router();

// define routes
userRouter.get("/", async (req, res) => {
  console.log("server receieved GET request to /user");

  const allUsers = await userDataLayer.get.all();

  // send response
  res.send(`hello world from user router!\n ${allUsers}`);
});

// export router
export default userRouter;
