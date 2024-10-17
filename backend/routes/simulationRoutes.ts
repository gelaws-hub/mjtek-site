import express from "express";
import {
  getAllSockets,
  getSocketById,
  createSocket,
  updateSocket,
  deleteSocket,
} from "../controllers/simulation/socketController";

<<<<<<< HEAD
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
=======
import { createRamType, deleteRamType, getAllRamTypes, getRamTypeById, updateRamType } from "../controllers/simulation/ramTypeController";

import {
  createSimulation,
  deleteSimulation,
  getAllSimulations,
  getSimulationById,
  updateSimulation,
} from "../controllers/simulation/simulatioController";
import { createSimulationDetail, deleteSimulationDetail, getAllSimulationDetails, getSimulationDetailById } from "../controllers/simulation/simulationDetailController";
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc

const simulationRoutes = express.Router();

// Socket routes
simulationRoutes.get("/sockets", getAllSockets); // Changed to plural
simulationRoutes.get("/sockets/:id", getSocketById);
simulationRoutes.post("/sockets", createSocket);
simulationRoutes.put("/sockets/:id", updateSocket);
simulationRoutes.delete("/sockets/:id", deleteSocket);

<<<<<<< HEAD
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
=======
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
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc

export default simulationRoutes;
