import { server_info } from "./config";
import { createServer } from "./server";

const main = () => {
    let {s, activate} = createServer(server_info);

    activate();
}

main();