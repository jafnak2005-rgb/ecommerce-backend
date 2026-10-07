import express from "express";

import {
  create,
  getAll,
  getByVariant,
  update,
  remove,
} from "./inventory.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const inventoryRouter = express.Router();


// Admin - create inventory
inventoryRouter.post(
  "/",
  verifyToken,
  adminOnly,
  create
);


// Admin - view inventory
inventoryRouter.get(
  "/",
  verifyToken,
  adminOnly,
  getAll
);


// Admin - get inventory by variant
inventoryRouter.get(
  "/:variantId",
  verifyToken,
  adminOnly,
  getByVariant
);


// Admin - update stock
inventoryRouter.put(
  "/:variantId",
  verifyToken,
  adminOnly,
  update
);


// Admin - delete inventory
inventoryRouter.delete(
  "/:variantId",
  verifyToken,
  adminOnly,
  remove
);

export default inventoryRouter;