import { Router } from 'express';
import ArticleController from '../controllers/article.controller';

const routerArticle = Router();
const articleController = new ArticleController();

routerArticle.post('/', articleController.create);
routerArticle.get('/', articleController.getAll);
routerArticle.get('/:id', articleController.getById);
routerArticle.post('/libelle', articleController.getByLibelle);
export default routerArticle;