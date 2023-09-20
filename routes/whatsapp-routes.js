import express from "express";
import { createWhatsappClient, sendMessage, getInitializedClients, getState } from "../controllers/WhatsappController.js";
const router = express.Router();

// Whatsapp
router.get("/createWhatsappClient", createWhatsappClient);
router.post("/sendMessage", sendMessage);
router.get("/getWhatsappClientState", getState);
router.get("/getInitializedClients", getInitializedClients);

export default router