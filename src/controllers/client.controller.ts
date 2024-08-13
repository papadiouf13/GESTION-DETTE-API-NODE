import { Request, Response } from "express";
import Controller from "../core/impl/controller";
import { StatusCodes } from "http-status-codes";
import { RestResponse } from "../core/response";
import app from "../app";

class ClientController extends Controller {
  async create(req: Request, res: Response) {
    try {
      const { nom, prenom, telephone } = req.body;
      const photo = req.file?.filename; 

      
      const newClient = await app.prisma.client.create({
        data: {
          nom,
          prenom,
          telephone,
          photo 
        }
      });

      res
        .status(StatusCodes.CREATED)
        .send(RestResponse.response(newClient, StatusCodes.CREATED.valueOf()));
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(RestResponse.response(error, StatusCodes.INTERNAL_SERVER_ERROR.valueOf(), 'Erreur Base de données'));
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const clients = await app.prisma.client.findMany({
        select: {
          id: true,
          nom: true,
          prenom: true,
          telephone: true,
          photo: true
        }
      });
      res
        .status(StatusCodes.OK)
        .send(RestResponse.response(clients, StatusCodes.OK.valueOf()));
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(RestResponse.response(error, StatusCodes.INTERNAL_SERVER_ERROR.valueOf(), 'Erreur Base de données'));
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const client = await app.prisma.client.findUniqueOrThrow({
        where: { id: Number.parseInt(req.params.id) },
        select: {
          id: true,
          nom: true,
          prenom: true,
          telephone: true,
          photo: true
        }
      });
      res
        .status(StatusCodes.OK)
        .send(RestResponse.response(client, StatusCodes.OK.valueOf()));
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(RestResponse.response(error, StatusCodes.NOT_FOUND.valueOf(), 'Client non trouvé'));
    }
  }

  async getByTelephone(req: Request, res: Response) {
    try {
      const client = await app.prisma.client.findFirstOrThrow({
        where: { telephone: req.body.telephone },
        select: {
          id: true,
          nom: true,
          prenom: true,
          telephone: true,
          photo: true
        }
      });
      res
        .status(StatusCodes.OK)
        .send(RestResponse.response(client, StatusCodes.OK.valueOf()));
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(RestResponse.response(error, StatusCodes.NOT_FOUND.valueOf(), 'Client non trouvé'));
    }
  }

  
  async getDettes(req: Request, res: Response) {
    try {
      const clientId = Number.parseInt(req.params.clientId);
      const dettes = await app.prisma.dette.findMany({
        where: { clientId: clientId },
        include: { articles: true }
      });
  
      if (dettes.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).send(RestResponse.response(null, StatusCodes.NOT_FOUND.valueOf(), 'Ce client n\'a pas de dette'));
      }
  
      res.status(StatusCodes.OK).send(RestResponse.response(dettes, StatusCodes.OK.valueOf()));
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(RestResponse.response(error, StatusCodes.INTERNAL_SERVER_ERROR.valueOf(), 'Erreur lors de la récupération des dettes'));
    }
  }
  
  async getArticlesByDette(req: Request, res: Response) {
    try {
      const detteId = Number.parseInt(req.params.id);
      const dette = await app.prisma.dette.findUnique({
        where: { id: detteId },
        include: { articles: { include: { article: true } } }
      });
  
      if (!dette) {
        return res.status(StatusCodes.NOT_FOUND).send(RestResponse.response(null, StatusCodes.NOT_FOUND.valueOf(), 'Cette dette n\'existe pas donc pas d\'articles'));
      }
  
      res.status(StatusCodes.OK).send(RestResponse.response(dette.articles, StatusCodes.OK.valueOf()));
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send(RestResponse.response(error, StatusCodes.NOT_FOUND.valueOf(), 'Cette dette n\'existe pas donc pas d\'articles'));
    }
  }
  
  async getPaiementsByDette(req: Request, res: Response) {
    try {
      const detteId = Number.parseInt(req.params.id);
      const paiements = await app.prisma.paiement.findMany({
        where: { detteId: detteId }
      });
  
      if (paiements.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).send(RestResponse.response(null, StatusCodes.NOT_FOUND.valueOf(), 'Cette dette n\'existe pas donc pas de paiements'));
      }
  
      res.status(StatusCodes.OK).send(RestResponse.response(paiements, StatusCodes.OK.valueOf()));
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send(RestResponse.response(error, StatusCodes.NOT_FOUND.valueOf(), 'Cette dette n\'existe pas donc pas de paiements'));
    }
  }
  


}

export default ClientController;
