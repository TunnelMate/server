import { ServerConfig } from "../../interfaces/server";

export const getSchema = (options: ServerConfig): String => {
    return options.secure ? 'https' : 'http'
}
