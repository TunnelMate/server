import http from 'http';

export default (out: object, res: http.ServerResponse) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(out));
    res.end();
}
