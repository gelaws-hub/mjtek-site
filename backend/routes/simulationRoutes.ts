import express from "express";
import {
  getAllSockets,
  getSocketById,
  // createSocket,
  updateSocket,
  deleteSocket,
  createMultipleSockets,
} from "../controllers/simulation/socketController";

import {
  createRamType,
  deleteRamType,
  getAllRamTypes,
  getRamTypeById,
  updateRamType,
} from "../controllers/simulation/ramTypeController";


import {
  createProductSocket,
  deleteProductSocket,
  getProductSocketById,
  updateProductSocket,
} from "../controllers/simulation/productSocketController";
import {
  createProductRamType,
  deleteProductRamType,
  getProductRamTypeById,
  updateProductRamType,
} from "../controllers/simulation/productRamTypeController";
import { getAllSocketRamType } from "../controllers/simulation/socketRamType";
import { deleteSimulation, getSimulationById, getSimulations, saveSimulation, updateSimulation } from "../controllers/simulation/simulationController";
import { ensureCorrectUser } from "../auth/middleware/buyer/buyerMiddleware";
import { authorize, ensureAuthenticated } from "../auth/userController";

const simulationRoutes = express.Router();

// Socket routes
simulationRoutes.get("/socket", getAllSockets);
simulationRoutes.get("/socket/:id", getSocketById);
simulationRoutes.put("/socket/:id", updateSocket);
simulationRoutes.delete("/socket/:id", deleteSocket);
simulationRoutes.post("/socket", createMultipleSockets);

// Tipe_RAM routes
simulationRoutes.get("/ramtype", getAllRamTypes);
simulationRoutes.get("/ramtype/:id", getRamTypeById);
simulationRoutes.post("/ramtype", createRamType);
simulationRoutes.put("/ramtype/:id", updateRamType);
simulationRoutes.delete("/ramtype/:id", deleteRamType);


// Product Socket routes
simulationRoutes.get("/product-socket/:id", getProductSocketById);
simulationRoutes.post("/product-socket", createProductSocket);
simulationRoutes.delete("/product-socket/:id", deleteProductSocket);
simulationRoutes.put("/product-socket/:id", updateProductSocket);

// Product Ram Type routes
simulationRoutes.get("/product-socket/:id", getProductRamTypeById);
simulationRoutes.post("/product-socket", createProductRamType);
simulationRoutes.delete("/product-socket/:id", deleteProductRamType);
simulationRoutes.put("/product-socket/:id", updateProductRamType);

simulationRoutes.get("/socket-ramtype", getAllSocketRamType);

simulationRoutes.post("/simulation", ensureAuthenticated, authorize(["buyer"]), saveSimulation);
simulationRoutes.get("/simulations", ensureAuthenticated, authorize(["buyer"]), getSimulations);
simulationRoutes.get("/simulation/:id", getSimulationById);
simulationRoutes.patch("/simulation/:id", ensureAuthenticated, authorize(["buyer"]), updateSimulation);
simulationRoutes.delete("/simulation/:id", ensureAuthenticated, authorize(["buyer"]), deleteSimulation);

export default simulationRoutes;
