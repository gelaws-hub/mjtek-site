import express from "express";
import {
  getAllSockets,
  getSocketById,
  createSocket,
  updateSocket,
  deleteSocket,
} from "../controllers/simulation/socketController";

import {
  getAllRamTypes,
  getRamTypeById,
  createRamType,
  updateRamType,
  deleteRamType,
} from "../controllers/simulation/ramTypeController";

import {
  getAllSimulations,
  getSimulationById,
  createSimulation,
  updateSimulation,
  deleteSimulation,
} from "../controllers/simulation/simulationController";

import {
  getAllSimulationDetails,
  getSimulationDetailById,
  createSimulationDetail,
  deleteSimulationDetail,
} from "../controllers/simulation/simulationDetailController";

const simulationRoutes = express.Router();

// Socket routes
simulationRoutes.get("/sockets", getAllSockets); // Changed to plural
simulationRoutes.get("/sockets/:id", getSocketById);
simulationRoutes.post("/sockets", createSocket);
simulationRoutes.put("/sockets/:id", updateSocket);
simulationRoutes.delete("/sockets/:id", deleteSocket);

// RAM Type routes
simulationRoutes.get("/ram-types", getAllRamTypes); // Changed to plural and updated naming
simulationRoutes.get("/ram-types/:id", getRamTypeById);
simulationRoutes.post("/ram-types", createRamType);
simulationRoutes.put("/ram-types/:id", updateRamType);
simulationRoutes.delete("/ram-types/:id", deleteRamType);

// Simulation routes
simulationRoutes.get("/simulations", getAllSimulations); // Changed to plural
simulationRoutes.get("/simulations/:id", getSimulationById);
simulationRoutes.post("/simulations", createSimulation);
simulationRoutes.put("/simulations/:id", updateSimulation);
simulationRoutes.delete("/simulations/:id", deleteSimulation);

// Simulation Detail routes
simulationRoutes.get("/simulation-details", getAllSimulationDetails); // Changed to plural
simulationRoutes.get("/simulation-details/:id", getSimulationDetailById);
simulationRoutes.post("/simulation-details", createSimulationDetail);
simulationRoutes.delete("/simulation-details/:id", deleteSimulationDetail);

export default simulationRoutes;
