import express from "express";

const clerkRouter = express.Router();

clerkRouter.get("/" , async(req, res) => {
    res.send('This is a protected route');
});

export default clerkRouter;