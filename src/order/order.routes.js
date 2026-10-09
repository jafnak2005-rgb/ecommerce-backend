
import express from "express";

import {
  create,
  getAll,
  getOne,
  cancel,
  updateOrderStatus,
} from "./order.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const orderRouter = express.Router();

// Customer routes
orderRouter.post("/", verifyToken, create);
orderRouter.get("/", verifyToken, getAll);
orderRouter.get("/:id", verifyToken, getOne);
orderRouter.put("/:id/cancel", verifyToken, cancel);

// Admin order status update
orderRouter.put(
  "/:id/status",
  verifyToken,
  adminOnly,
  updateOrderStatus
);

export default orderRouter;
