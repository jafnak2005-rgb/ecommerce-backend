import express from "express";

import {
  create,
  getAll,
  getOne,
  cancel,
} from "./order.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/", verifyToken, create);

orderRouter.get("/", verifyToken, getAll);

orderRouter.get("/:id", verifyToken, getOne);

orderRouter.put("/:id/cancel", verifyToken, cancel);

export default orderRouter;