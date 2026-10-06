import express from "express";

import {
  getAll,
  getOne,
  remove,
} from "./customer.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const customerRouter = express.Router();

customerRouter.get("/", verifyToken, getAll);

customerRouter.get("/:id", verifyToken, getOne);

customerRouter.delete("/:id", verifyToken, remove);

export default customerRouter;