import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./product.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const productRouter = express.Router();

// Admin only
productRouter.post(
  "/",
  verifyToken,
  adminOnly,
  create
);

// Public
productRouter.get(
  "/",
  getAll
);

productRouter.get(
  "/:id",
  getOne
);

// Admin only
productRouter.put(
  "/:id",
  verifyToken,
  adminOnly,
  update
);

productRouter.delete(
  "/:id",
  verifyToken,
  adminOnly,
  remove
);

export default productRouter;