import { ServerConfig, ServerContext } from "../interfaces";
import { ClientManager } from "../manager";

export default (
    manager: ClientManager,
    config: ServerConfig
): ServerContext => {
    return { config, manager };
};
