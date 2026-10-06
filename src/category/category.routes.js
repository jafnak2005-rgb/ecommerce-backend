import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./category.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/", verifyToken, create);

categoryRouter.get("/", getAll);

categoryRouter.get("/:id", getOne);

categoryRouter.put("/:id", verifyToken, update);

categoryRouter.delete("/:id", verifyToken, remove);

export default categoryRouter;