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
} from "../controllers/simulation/TipeRAMController";

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

export default simulationRoutes;
