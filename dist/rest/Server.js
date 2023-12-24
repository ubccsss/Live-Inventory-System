import express from "express";
import cors from "cors";
export default class Server {
    constructor(port) {
        console.info(`Server::<init>( ${port} )`);
        this.port = port;
        this.express = express();
        this.registerMiddleware();
        this.registerRoutes();
    }
    start() {
        return new Promise((resolve, reject) => {
        });
    }
    registerMiddleware() {
        this.express.use(express.json());
        this.express.use(cors());
    }
    registerRoutes() {
    }
}
//# sourceMappingURL=Server.js.map