import { Router } from 'express';
import ArticleController from '../controllers/article.controller';
import validatorSchema from '../middlewares/validators/validator.middleware';

const routerArticle = Router();
const articleController = new ArticleController();

routerArticle.post('/', [validatorSchema()], articleController.create);
routerArticle.get('/', articleController.getAll);
routerArticle.get('/:id', articleController.getById);
routerArticle.post('/libelle', articleController.getByLibelle);
export default routerArticle;