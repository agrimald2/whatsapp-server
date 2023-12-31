import express from "express"
import whaRoutes from "./routes/whatsapp-routes.js"

const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);

app.use("/api/whatsapp", whaRoutes)
