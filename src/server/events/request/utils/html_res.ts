import http from "http";

export default (out: string, res: http.ServerResponse) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(out);
    res.end();
};
