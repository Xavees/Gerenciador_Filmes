import express from "express";
import cors from "cors";
import config from "config";
import router from "./router";
import db from "../config/db";
import Logger from "../config/logger";
import morganMiddleware from "./middleware/morganMiddleware";
const app = express();


// CORS & JSON Middleware
app.use(cors());
app.use(express.json());


// importando router
app.use(morganMiddleware);
app.use("/api/", router);





// importando a port

const port = config.get<string|number>("PORT")

app.listen(3000, async ()=> {
    await db();

    Logger.info(`Aplicação conectada e funcionando na porta ${port}`);

} )