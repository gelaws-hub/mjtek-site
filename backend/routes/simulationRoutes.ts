import express from "express";
import {
  getAllSockets,
  getSocketById,
  createSocket,
  updateSocket,
  deleteSocket,
} from "../controllers/simulation/socketController";

import {
  getAllTipeRAM,
  getTipeRAMById,
  createTipeRAM,
  updateTipeRAM,
  deleteTipeRAM,
} from "../controllers/simulation/tipeRAMController";

import {
  getAllSimulasi,
  getSimulasiById,
  createSimulasi,
  updateSimulasi,
  deleteSimulasi,
} from "../controllers/simulation/simulasiController";
import {
  getAllDetailSimulasi,
  getDetailSimulasiById,
  createDetailSimulasi,
  deleteDetailSimulasi,
} from "../controllers/simulation/detailSimulasiController";

const simulationRoutes = express.Router();

// Socket routes
simulationRoutes.get("/socket", getAllSockets);
simulationRoutes.get("/socket/:id", getSocketById);
simulationRoutes.post("/socket", createSocket);
simulationRoutes.put("/socket/:id", updateSocket);
simulationRoutes.delete("/socket/:id", deleteSocket);

// Tipe_RAM routes
simulationRoutes.get("/tiperam", getAllTipeRAM);
simulationRoutes.get("/tiperam/:id", getTipeRAMById);
simulationRoutes.post("/tiperam", createTipeRAM);
simulationRoutes.put("/tiperam/:id", updateTipeRAM);
simulationRoutes.delete("/tiperam/:id", deleteTipeRAM);

// Simulasi routes
simulationRoutes.get("/simulasi", getAllSimulasi);
simulationRoutes.get("/simulasi/:id", getSimulasiById);
simulationRoutes.post("/simulasi", createSimulasi);
simulationRoutes.put("/simulasi/:id", updateSimulasi);
simulationRoutes.delete("/simulasi/:id", deleteSimulasi);

// Detail_Simulasi routes
simulationRoutes.get("/detailsimulasi", getAllDetailSimulasi);
simulationRoutes.get("/detailsimulasi/:id", getDetailSimulasiById);
simulationRoutes.post("/detailsimulasi", createDetailSimulasi);
simulationRoutes.delete("/detailsimulasi/:id", deleteDetailSimulasi);

export default simulationRoutes;
