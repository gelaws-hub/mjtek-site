import express from "express";

import { authorize, ensureAuthenticated } from "../auth/userController";
import { getSalesDashboard, getTopUsers } from "../controllers/chart_controller/salesController";

const chartRoutes = express.Router();

chartRoutes.get("/sales", ensureAuthenticated, authorize(["admin", "owner"]), getSalesDashboard);
chartRoutes.get("/top-buyers", ensureAuthenticated, authorize(["admin", "owner"]), getTopUsers);

export default chartRoutes;
