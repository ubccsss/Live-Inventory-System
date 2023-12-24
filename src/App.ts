import Server from "./rest/Server";

/**
 * Main app class that is run with the node command. Starts the server.
 */
export class App {
	public initServer(port: number) {
		console.info(`App::initServer( ${port} ) - start`);

		const server = new Server(port);
		return server
			.start()
			.then(() => {
				console.info("App::initServer() - started");
			})
			.catch((err: Error) => {
				console.error(`App::initServer() - ERROR: ${err.message}`);
			});
	}
}

// This ends up starting the whole system and listens on a hardcoded port (4321)
console.info("App - starting");
const app = new App();
(async () => {
	await app.initServer(4321);
})();
