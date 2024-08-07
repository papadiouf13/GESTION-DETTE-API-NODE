import { Request, Response } from "express";
import Controller from "../core/impl/controller";
import prisma from "../core/impl/prisma.model";
import { StatusCodes } from "http-status-codes";
import { RestResponse } from "../core/response";

class ClientController extends Controller {
  async create(req: Request, res: Response) {
    try {
        const newClient = await prisma.client.create({
            data: req.body
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
      const clients = await prisma.client.findMany({
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
      const client = await prisma.client.findUniqueOrThrow({
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
      const client = await prisma.client.findFirstOrThrow({
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

}

export default ClientController;
