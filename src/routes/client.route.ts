import { Router } from "express";
import ClientController from "../controllers/client.controller";
import upload from "../middlewares/upload.middleware"; 

const routerClient = Router();
const clientController = new ClientController();

routerClient.post('/', upload.single('photo'), clientController.create);
routerClient.get('/', clientController.getAll);
routerClient.get('/:id', clientController.getById);
routerClient.post('/telephone', clientController.getByTelephone);

routerClient.get('/:clientId/dette', clientController.getDettes); 
routerClient.get('/dette/:id/articles', clientController.getArticlesByDette); 
routerClient.get('/dette/:id/paiements', clientController.getPaiementsByDette); 

export default routerClient;

