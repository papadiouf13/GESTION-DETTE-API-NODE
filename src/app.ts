import express from 'express';
import routerArticle from './routes/article.route';
import routerClient from './routes/client.route';
import prismaClient from './config/prisma.config';
import routerAuth from './routes/auth.route';
import routerDette from './routes/dette.route';
import routerPaiement from './routes/paiement.route';



class App {
    public server;
    public prisma;
    constructor(){
        this.server = express();
        this.middleware();
        this.route();
        this.prisma = prismaClient;
    }

    middleware(){
        this.server.use(express.json());
    }

    route(){
        this.server.use("/api/v1/articles", routerArticle)
        this.server.use("/api/v1/clients", routerClient);
        this.server.use("/api/v1/auth", routerAuth)
        this.server.use("/api/v1/dettes", routerDette)
        this.server.use("/api/v1/paiements", routerPaiement)
    }
}

const app = new App();
export default app


