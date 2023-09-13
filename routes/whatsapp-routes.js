import express from "express";
import { createWhatsappClient, sendMessage, getInitializedClients } from "../controllers/WhatsappController.js";
const router = express.Router();

router.get("/createWhatsappClient", createWhatsappClient);
router.get("/sendMessage", sendMessage);
router.get("/getInitializedClients", getInitializedClients)

export default router