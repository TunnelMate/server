import { ServerConfig, ServerContext } from "../../interfaces";
import { getSchema } from "../utils/schema";
import logger from "../../logger";

export default (context: ServerContext) => {
    return () => {
        logger.info(`Passagaway server listening in: ${getSchema(context.config)}://${context.config.host}:${context.config.port}`)
    }
}
