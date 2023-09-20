import pkg from 'whatsapp-web.js';
import { storeWhatsappClient } from './Clients.js';
// Utilities
import { printQROnConsole } from '../utilities/qr-code.js'

const { Client, LocalAuth, MessageMedia } = pkg;

class Whatsapp {
    constructor(clientId) {
        const puppeteerArgs = [
            '--log-level=3',
            '--start-maximized',
            '--no-default-browser-check',
            '--disable-infobars',
            '--disable-web-security',
            '--disable-site-isolation-trials',
            '--no-experiments',
            '--ignore-gpu-blacklist',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list',
            '--disable-extensions',
            '--disable-default-apps',
            '--enable-features=NetworkService',
            '--disable-setuid-sandbox',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--headless=new'
        ];

        this.client = new Client({
            authStrategy: new LocalAuth({ clientId }),
            qrMaxRetries: 5,
            puppeteer: { args: puppeteerArgs },
            takeoverOnConflict: true
        });

        this.client.on('qr', this.handleQrUpdate.bind(this, clientId));
        this.client.on('ready', this.handleReady.bind(this, clientId));
        this.client.on('disconnected', (reason) => {
            // send DISCONNECTED state
            console.log('Client was logged out', reason);
        })
        this.client.on('auth_failure', (message) => {
            console.log('Intento de Autenticación Falló', message);
        })
        this.client.on('message', this.handleMessageReceived.bind(this));
    }
    async initialize() {
        await this.client.initialize();
    }

    handleQrUpdate(qr, clientId) {
        // send username and qr_code in base64
            // username -> phone_number
        const data = { code: clientId, phone_number: qr };
        console.dir(data);
        printQROnConsole(data.code);
    }
    handleReady(clientId) {
        // send instance Ready
        this.client.off('ready', this.handleReady.bind(this, clientId));
        this.client.off('qr', this.handleQrUpdate.bind(this, clientId));
        console.log('Instancia Activa: ' + clientId);
        storeWhatsappClient(clientId, this.client);
    }
    async handleMessageReceived(message) {
        const messageData = {
            messageId : message._data.id.id,
            from: message._data.from,
            fromName: message._data.notifyName,
            to: message._data.to,
            type: message._data.type,
            body: message._data.body,
        }
        console.dir(messageData);
    }
}

export { Whatsapp };