import { ServerConfig } from "../../interfaces/server";
import { getSchema } from "../utils/schema";
import logger from "../../logger";

export default (options: ServerConfig) => {
    return () => {
        logger.info(`Passagaway server listening in: ${getSchema(options)}://${options.host}:${options.port}`)
    }
}
