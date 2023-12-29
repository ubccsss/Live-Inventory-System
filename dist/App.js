var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Server from "./rest/Server";
export class App {
    initServer(port) {
        console.info(`App::initServer( ${port} ) - start`);
        const server = new Server(port);
        return server
            .start()
            .then(() => {
            console.info("App::initServer() - started");
        })
            .catch((err) => {
            console.error(`App::initServer() - ERROR: ${err.message}`);
        });
    }
}
console.info("App - starting");
const app = new App();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield app.initServer(4321);
}))();
//# sourceMappingURL=App.js.map