import express from "express";

import {
  get,
  add,
  update,
  remove,
  clear,
} from "./cart.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.get("/", verifyToken, get);

cartRouter.post("/", verifyToken, add);

cartRouter.put("/:itemId", verifyToken, update);

cartRouter.delete("/:itemId", verifyToken, remove);

cartRouter.delete("/", verifyToken, clear);

export default cartRouter;