import express from "express";
import {
  getAllSockets,
  getSocketById,
  createSocket,
  updateSocket,
  deleteSocket,
} from "../controllers/simulation/socketController";

import { createRamType, deleteRamType, getAllRamTypes, getRamTypeById, updateRamType } from "../controllers/simulation/ramTypeController";

import {
  createSimulation,
  deleteSimulation,
  getAllSimulations,
  getSimulationById,
  updateSimulation,
} from "../controllers/simulation/simulatioController";
import { createSimulationDetail, deleteSimulationDetail, getAllSimulationDetails, getSimulationDetailById } from "../controllers/simulation/simulationDetailController";

const simulationRoutes = express.Router();

// Socket routes
simulationRoutes.get("/socket", getAllSockets);
simulationRoutes.get("/socket/:id", getSocketById);
simulationRoutes.post("/socket", createSocket);
simulationRoutes.put("/socket/:id", updateSocket);
simulationRoutes.delete("/socket/:id", deleteSocket);

// Tipe_RAM routes
simulationRoutes.get("/tiperam", getAllRamTypes);
simulationRoutes.get("/tiperam/:id", getRamTypeById);
simulationRoutes.post("/tiperam", createRamType);
simulationRoutes.put("/tiperam/:id", updateRamType);
simulationRoutes.delete("/tiperam/:id", deleteRamType);

// Simulasi routes
simulationRoutes.get("/simulasi", getAllSimulations);
simulationRoutes.get("/simulasi/:id", getSimulationById);
simulationRoutes.post("/simulasi", createSimulation);
simulationRoutes.put("/simulasi/:id", updateSimulation);
simulationRoutes.delete("/simulasi/:id", deleteSimulation);

// Detail_Simulasi routes
simulationRoutes.get("/detailsimulasi", getAllSimulationDetails);
simulationRoutes.get("/detailsimulasi/:id", getSimulationDetailById);
simulationRoutes.post("/detailsimulasi", createSimulationDetail);
simulationRoutes.delete("/detailsimulasi/:id", deleteSimulationDetail);

export default simulationRoutes;
