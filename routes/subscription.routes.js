import { Router } from "express";
import {
  createSubscription,
  getSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";
import { authorize } from "../middlewares/authorize.js";

const subcriptionRouter = Router();

subcriptionRouter.get("/");

// Get subscription detail
subcriptionRouter.get("/:id", getSubscription);

// Get user subscriptions
subcriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subcriptionRouter.post("/", authorize, createSubscription);

export default subcriptionRouter;
