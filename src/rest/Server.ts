import express, {Application, Request, Response} from "express";
import * as http from "http";
import cors from "cors";

export default class Server {
	private readonly port: number;
	private express: Application;
	public server: http.Server | undefined;
	constructor(port: number) {
		console.info(`Server::<init>( ${port} )`);
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
		this.express.get("/echo/:msg", Server.echo);
		this.express.get("/items", Server.getItems);
		this.express.post("/addItem", Server.addItem);
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

	// TODO
	// GET request
	// return product information relating to item_individual
	// the front end needs this to display all of the products
	private static getItems(req: Request, res: Response) {
		try {
			console.log("Server::getItems(..)");
			res.status(200).json([
				{
					name: "Coca Cola",
					description: "A 355 ml can of Coca Cola.",
					price: 0.50,
					category: "Fridge",
					img_url: "www.google.com",
					reservable: false,
					quantity_remaining: 6,
					low_stock_threshold: 2,
					last_restocked: Date.now() - 3 * 24 * 60 * 60 * 1000,
					max_quantity_per_transaction: 6
				},
				{
					name: "Bubly",
					description: "A 355 ml can of Bubly",
					price: 1.00,
					category: "Fridge",
					img_url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Bubly_logo_2018.png",
					reservabe: false,
					quantity_remaining: 6,
					low_stock_threshold: 2,
					last_restocked:Date.now() - 5 * 24 * 60 * 60 * 1000
				}
			]);
		} catch (err: any) {
			res.status(400).json({error: err.message});
		}
	}

	public static addItem(req: Request, res: Response) {
		console.log("Doing work.. Validating and parsing the data and adding it to the db..");
		console.log(req.body);
		res.status(200).json({result: "stub output"});
	}

}


