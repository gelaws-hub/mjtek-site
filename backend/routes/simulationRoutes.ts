import express from "express";
import {
  getAllSockets,
  getSocketById,
  createSocket,
  updateSocket,
  deleteSocket,
} from "../controllers/simulation/socketController";

import {
  getAllDetailRAM,
  getDetailRAMById,
  createDetailRAM,
  updateDetailRAM,
  deleteDetailRAM,
} from "../controllers/simulation/detailRAMController";

import {
  getAllDetailCPU,
  getDetailCPUById,
  createDetailCPU,
  updateDetailCPU,
  deleteDetailCPU,
} from "../controllers/simulation/detailCPUController";

import {
  getAllDetailMotherboard,
  getDetailMotherboardById,
  createDetailMotherboard,
  updateDetailMotherboard,
  deleteDetailMotherboard,
} from "../controllers/simulation/detailMotherboardController";

import {
  getAllTipeRAM,
  getTipeRAMById,
  createTipeRAM,
  updateTipeRAM,
  deleteTipeRAM,
} from "../controllers/simulation/TipeRAMController";

const simulationRoutes = express.Router();

// Socket routes
simulationRoutes.get("/socket", getAllSockets);
simulationRoutes.get("/socket/:id", getSocketById);
simulationRoutes.post("/socket", createSocket);
simulationRoutes.put("/socket/:id", updateSocket);
simulationRoutes.delete("/socket/:id", deleteSocket);

// Detail_RAM routes
simulationRoutes.get("/detailram", getAllDetailRAM);
simulationRoutes.get("/detailram/:id", getDetailRAMById);
simulationRoutes.post("/detailram", createDetailRAM);
simulationRoutes.put("/detailram/:id", updateDetailRAM);
simulationRoutes.delete("/detailram/:id", deleteDetailRAM);

// Detail_CPU routes
simulationRoutes.get("/detailcpu", getAllDetailCPU);
simulationRoutes.get("/detailcpu/:id", getDetailCPUById);
simulationRoutes.post("/detailcpu", createDetailCPU);
simulationRoutes.put("/detailcpu/:id", updateDetailCPU);
simulationRoutes.delete("/detailcpu/:id", deleteDetailCPU);

// Detail_Motherboard routes
simulationRoutes.get("/detailmotherboard", getAllDetailMotherboard);
simulationRoutes.get("/detailmotherboard/:id", getDetailMotherboardById);
simulationRoutes.post("/detailmotherboard", createDetailMotherboard);
simulationRoutes.put("/detailmotherboard/:id", updateDetailMotherboard);
simulationRoutes.delete("/detailmotherboard/:id", deleteDetailMotherboard);

// Tipe_RAM routes
simulationRoutes.get("/tiperam", getAllTipeRAM);
simulationRoutes.get("/tiperam/:id", getTipeRAMById);
simulationRoutes.post("/tiperam", createTipeRAM);
simulationRoutes.put("/tiperam/:id", updateTipeRAM);
simulationRoutes.delete("/tiperam/:id", deleteTipeRAM);

export default simulationRoutes;
