import { Whatsapp } from '../models/Whatsapp.js';
import { Clients } from '../models/Clients.js'

export const createWhatsappClient = async (req, res) => {
    try {
        const clientId = req.query.clientId;
        const whatsapp = new Whatsapp(clientId);
        await whatsapp.initialize();
        return res.status(200).json({ message: "Iniciando Whatsapp: " + clientId });
    } catch (error) {
        console.error("Error initializing WhatsApp client:", error);
        return res.status(500).json({ error: "Failed to initialize WhatsApp client" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const clientId = req.query.clientId;
        const client = Clients.get(clientId);
        if (!client) {
            return res.status(404).json({ error: "WhatsApp client not found" });
        }
        client.sendMessage(req.query.chatId, req.query.Content);
        return res.status(200).json({ message: "Mensaje Enviado a: " + req.query.chatId });
    } catch (error) {
        console.error(`Error sending message: ${error}`);
        return res.status(500).json({ error: "Failed to send message" });
    }
}

export const getInitializedClients = (res) => {
    return res.status(200).json(whatsappClients);
}

export const getState = (req, res) => {
    try {
        const clientId = req.query.clientId;
        const client = Clients.get(clientId);
        if (!client) {
            return res.status(404).json({ error: "WhatsApp client not found" });
        }
        return res.status(200).json({ message: `Status Instancia - ${req.query.chatId} : ${client.getState()}`});
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ error: "Failed to send message" });
    }
}