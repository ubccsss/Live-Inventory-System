import express, {Application, Request, Response} from "express";
import * as http from "http";
import cors from "cors";

export default class Server {
    private readonly port: number;
    private express: Application;
    private server: http.Server | undefined;
    constructor(port: number) {
        console.info(`Server::<init>( ${port} )`)
        this.port = port;
        this.express = express();
        this.registerMiddleware();
        this.registerRoutes();
    }

	public start(): Promise<void> {
		return new Promise((resolve, reject) => {
			console.info("Server::start() - start");
			if (this.server !== undefined) {
				console.error("Server::start() - server already listening");
				reject();
			} else {
				this.server = this.express
					.listen(this.port, () => {
						console.info(`Server::start() - server listening on port: ${this.port}`);
						resolve();
					})
					.on("error", (err: Error) => {
						// catches errors in server start
						console.error(`Server::start() - server ERROR: ${err.message}`);
						reject(err);
					});
			}
		});
	}

	public stop(): Promise<void> {
		console.info("Server::stop()");
		return new Promise((resolve, reject) => {
			if (this.server === undefined) {
				console.error("Server::stop() - ERROR: server not started");
				reject();
			} else {
				this.server.close(() => {
					console.info("Server::stop() - server closed");
					resolve();
				});
			}
		});
	}

    private registerMiddleware() {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private registerRoutes() {
        this.express.get("/echo/:msg", Server.echo)
    }

	private static echo(req: Request, res: Response) {
		try {
			console.log(`Server::echo(..) - params: ${JSON.stringify(req.params)}`);
			const response = Server.performEcho(req.params.msg);
			res.status(200).json({result: response});
		} catch (err: any) {
			res.status(400).json({error: err.message});
		}
	}

	private static performEcho(msg: string): string {
		if (typeof msg !== "undefined" && msg !== null) {
			return `${msg}...${msg}`;
		} else {
			return "Message not provided";
		}
	}

}