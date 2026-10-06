import express from "express";

import {
  create,
  getAll,
  getByProduct,
  update,
  remove,
} from "./inventory.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const inventoryRouter = express.Router();

inventoryRouter.post("/", verifyToken, create);

inventoryRouter.get("/", verifyToken, getAll);

inventoryRouter.get(
  "/:productId",
  verifyToken,
  getByProduct
);

inventoryRouter.put(
  "/:productId",
  verifyToken,
  update
);

inventoryRouter.delete(
  "/:productId",
  verifyToken,
  remove
);

export default inventoryRouter;