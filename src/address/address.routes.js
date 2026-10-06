import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./address.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const addressRouter = express.Router();

addressRouter.post("/", verifyToken, create);

addressRouter.get("/", verifyToken, getAll);

addressRouter.get("/:id", verifyToken, getOne);

addressRouter.put("/:id", verifyToken, update);

addressRouter.delete("/:id", verifyToken, remove);

export default addressRouter;