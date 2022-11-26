import { server_info } from "./config";
import { createServer } from "./server";

import createManager from "./manager";
import createContext from "./context";

const main = () => {

    let manager = createManager(server_info);
    let context = createContext(manager, server_info)

    let {s, activate} = createServer(context);

    activate();
}

main();