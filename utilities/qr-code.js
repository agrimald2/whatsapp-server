import qrcode from 'qrcode-terminal';

export const printQROnConsole = (qr) => {
    console.log(qr);
    qrcode.generate(qr, { small: true });

    return res.status(200).json({ message: "Instancia iniciada correctamente:" + req.query.clientID });
}