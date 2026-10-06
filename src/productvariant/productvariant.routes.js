import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./productvariant.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const productVariantRouter = express.Router();

// Admin only
productVariantRouter.post(
  "/",
  verifyToken,
  adminOnly,
  create
);

// Public
productVariantRouter.get(
  "/",
  getAll
);

productVariantRouter.get(
  "/:id",
  getOne
);

// Admin only
productVariantRouter.put(
  "/:id",
  verifyToken,
  adminOnly,
  update
);

productVariantRouter.delete(
  "/:id",
  verifyToken,
  adminOnly,
  remove
);

export default productVariantRouter;