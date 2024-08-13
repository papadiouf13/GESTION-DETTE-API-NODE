import { Router } from 'express';
import PaiementController from '../controllers/paiement.controller';
import validatorSchema from '../middlewares/validators/validator.middleware';


const routerPaiement = Router();
const paiementController = new PaiementController();

routerPaiement.post('/', [validatorSchema()], paiementController.create);

export default routerPaiement;