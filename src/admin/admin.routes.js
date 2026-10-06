import express from "express";

import {
  verifyToken,
} from "../middleware/auth.middleware.js";

import {
  adminOnly,
} from "../middleware/admin.middleware.js";

import {
  getDashboardStats,
  getCustomers,
  getAdminOrders,
  updateOrderStatus,
} from "./admin.controller.js";

const router = express.Router();


// Dashboard
router.get(
  "/dashboard",
  verifyToken,
  adminOnly,
  getDashboardStats
);


// Customers
router.get(
  "/customers",
  verifyToken,
  adminOnly,
  getCustomers
);


// Orders
router.get(
  "/orders",
  verifyToken,
  adminOnly,
  getAdminOrders
);


// Update order status
router.put(
  "/orders/:id/status",
  verifyToken,
  adminOnly,
  updateOrderStatus
);


export default router;