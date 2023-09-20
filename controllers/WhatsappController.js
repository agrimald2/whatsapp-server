import { Whatsapp } from '../models/Whatsapp.js';
import { Clients } from '../models/Clients.js'

export const createWhatsappClient = async (req, res) => {
    const clientId = req.query.clientId;
    let client;

    // Try to get Client
    try {
        client = await Clients.get(clientId);
    } catch (error) {
        console.error(`Error getting client with ID ${clientId}:`, error);
        return res.status(500).json({ error: `Failed to get client with ID ${clientId}` });
    }

    // Check if client is already connected
    if (client) {
        let state;
        try {
            state = await client.getState();
        } catch (error) {
            console.error(`Error getting state for client with ID ${clientId}:`, error);
            return res.status(500).json({ error: `Failed to get state for client with ID ${clientId}` });
        }
        if (state === 'CONNECTED') {
            return res.status(200).json({ message: `Whatsapp Client with ID ${clientId} is already initialized and CONNECTED` });
        }
    }

    // Create new Whatsapp Client using phone_number as clientID
    const whatsapp = new Whatsapp(clientId);
    try {
        await whatsapp.initialize();
        return res.status(200).json({ message: `Whatsapp Client Initialized: ${clientId}` });
    } catch (error) {
        console.error(`Error initializing WhatsApp client with ID ${clientId}:`, error);
        return res.status(500).json({ error: `Failed to initialize WhatsApp client with ID ${clientId}` });
    }
}

//@todo add handling PDF
export const sendMessage = async (req, res) => {
    try {
        const clientId = req.query.clientId;
        const client = Clients.get(clientId);
        if (!client) {
            return res.status(404).json({ error: "WhatsApp client not found" });
        }
        client.sendMessage(req.query.chatId, req.query.content);
        return res.status(200).json({ message: "Mensaje Enviado a: " + req.query.chatId });
    } catch (error) {
        console.error(`Error sending message: ${error}`);
        return res.status(500).json({ error: "Failed to send message" });
    }
}

export const getInitializedClients = (req, res) => {
    const clientIds = Array.from(Clients.keys());
    return res.status(200).json(clientIds);
}

export const getState = async (req, res) => {
    try {
        const clientId = req.query.clientId;
        const client = await Clients.get(clientId);
        if (!client) {
            return res.status(404).json({ error: "WhatsApp client not found" });
        }
        const state = await client.getState();
        return res.status(200).json({ message: `Status Instancia - ${req.query.clientId} : ${state}`, state: state });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ error: "Failed to send message" });
    }
}