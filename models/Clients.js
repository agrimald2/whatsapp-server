const Clients = new Map();

export const storeWhatsappClient = (clientId, client) => {
    Clients.set(clientId, client);
}

export { Clients };