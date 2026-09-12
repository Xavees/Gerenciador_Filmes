import mongoose from "mongoose";
import config from "config";
import dns from "node:dns";
import Logger from "./logger";

dns.setServers(["1.1.1.1", "8.8.8.8"]);


async function connect(){
    const DbUri = config.get<string>("dbUrl")


    try {
        await mongoose.connect(DbUri);
        Logger.info("Conectado ao banco de Dados!");

        
    } catch (e) {
      Logger.info("Não foi possível conectar ao MongoDB:");
    Logger.info(e);
    process.exit(1);
    }


}

export default connect;