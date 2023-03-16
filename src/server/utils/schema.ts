import { ServerConfig } from "../../interfaces";

export const getSchema = (options: ServerConfig): String => {
    return options.secure ? "https" : "http";
};
