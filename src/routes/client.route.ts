import { Router } from "express";
import ClientController from "../controllers/client.controller";

const routerClient = Router();
const clientController = new ClientController


routerClient.post('/', clientController.create);
routerClient.get('/', clientController.getAll);
routerClient.get('/:id', clientController.getById);
routerClient.post('/telephone', clientController.getByTelephone);

export default routerClient;