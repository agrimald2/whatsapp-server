/createWhatsappClient
    Description: This route is used to create a new WhatsApp client. It requires a phone number as a parameter.
    O
    Params:
        clientId: phone_number
    Example: 
        Input: 
            {
                clientId: 51974739478
            }
        Output:
            {
                "message": "Whatsapp Client Initialized: 51947739478"
            }

/sendMessage
    Description: This route is used to send a message. It requires the client's phone number, the chat ID, the type of message (text, video, or pdf), and the content of the message.
    Params: 
        clientId:   sender_phone_number
        chatId:     receiver_phone_number
        type:       ['text', 'pdf', 'img']
        content: 
            text -> string
            pdf  -> base64
            img -> base64
    Example: 
        Input: 
            {
                clientId:   51974739478
                chatId:     51934094501
                type:       text
                content:    "Hola cra"
            }
        Output:
            {
                "message": "Mensaje Enviado a: 51934094501@c.us"
            }

/getWhatsappClientState
    Description: This route is used to get the state of a WhatsApp client. It requires the client's phone number as a parameter.
    Params:
        clientId: phone_number
    Example:       
            {
                "message": "Status Instancia - 51947739478 : CONNECTED",
                "state": "CONNECTED"
            }

/getInitializedClients
    Description: This route is used to get all initialized clients. It does not require any parameters.
    Example:
        Input:
        
        Output:
