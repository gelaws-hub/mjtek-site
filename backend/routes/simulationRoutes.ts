import express from "express";
import {
  getAllSockets,
  getSocketById,
  createSocket,
  updateSocket,
  deleteSocket,
} from "../controllers/simulation/socketController";

import {
  createRamType,
  deleteRamType,
  getAllRamTypes,
  getRamTypeById,
  updateRamType,
} from "../controllers/simulation/ramTypeController";

import {
  createSimulation,
  deleteSimulation,
  getAllSimulations,
  getSimulationById,
  updateSimulation,
} from "../controllers/simulation/simulatioController";
import {
  createSimulationDetail,
  deleteSimulationDetail,
  getAllSimulationDetails,
  getSimulationDetailById,
} from "../controllers/simulation/simulationDetailController";

const simulationRoutes = express.Router();

// Socket routes
simulationRoutes.get("/socket", getAllSockets);
simulationRoutes.get("/socket/:id", getSocketById);
simulationRoutes.post("/socket", createSocket);
simulationRoutes.put("/socket/:id", updateSocket);
simulationRoutes.delete("/socket/:id", deleteSocket);

// Tipe_RAM routes
simulationRoutes.get("/ramtype", getAllRamTypes);
simulationRoutes.get("/ramtype/:id", getRamTypeById);
simulationRoutes.post("/ramtype", createRamType);
simulationRoutes.put("/ramtype/:id", updateRamType);
simulationRoutes.delete("/ramtype/:id", deleteRamType);

// Simulasi routes
simulationRoutes.get("/simulation", getAllSimulations);
simulationRoutes.get("/simulation/:id", getSimulationById);
simulationRoutes.post("/simulation", createSimulation);
simulationRoutes.put("/simulation/:id", updateSimulation);
simulationRoutes.delete("/simulation/:id", deleteSimulation);

// Detail_Simulasi routes
simulationRoutes.get("/simulation-detail", getAllSimulationDetails);
simulationRoutes.get("/simulation-detail/:id", getSimulationDetailById);
simulationRoutes.post("/simulation-detail", createSimulationDetail);
simulationRoutes.delete("/simulation-detail/:id", deleteSimulationDetail);

export default simulationRoutes;
