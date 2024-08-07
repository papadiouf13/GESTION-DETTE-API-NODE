import express from 'express';
import routerArticle from './routes/article.route';
import routerClient from './routes/client.route';

const app = express();
app.use(express.json());
app.use("/api/v1/articles", routerArticle)
app.use("/api/v1/clients", routerClient);
export default app


