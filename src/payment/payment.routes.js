import express from "express";

import {
  create,
  getAll,
  getOne,
} from "./payment.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/", verifyToken, create);

paymentRouter.get("/", verifyToken, getAll);

paymentRouter.get("/:id", verifyToken, getOne);

export default paymentRouter;