import colors from "colors";

export default class {
    private static readonly prefix = class {
        public static info: String = colors.cyan.bold("info");
    };

    public static info(msg: String) {
        console.log(`[${this.prefix.info}]: ${msg}`);
    }
}
