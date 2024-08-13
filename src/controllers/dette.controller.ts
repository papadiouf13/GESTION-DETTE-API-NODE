import { Request, Response } from "express";
import Controller from "../core/impl/controller";
import { StatusCodes } from "http-status-codes";
import { RestResponse } from "../core/response";
import app from "../app";

class DetteController extends Controller {
  async create(req: Request, res: Response)  {
      try {
        const newDette = await app.prisma.$transaction(async (tx) =>{
          const newDateBefore = await tx.dette.create({
            data: {
              montant: Number.parseFloat(req.body.montant),
              client: {
                connect: {
                  id: Number.parseInt(req.body.clientId)
                }
              },
              articles: {
                create: req.body.articles
              }
            },
            include: {
              articles: {
                select: {
                  article: {
                    select: {
                      id: true,
                      qteStock: true
                    }
                  },
                  qteVente: true,
                  prixVente: true
                }
              }
            }
          })

          await newDateBefore.articles.forEach(async (article) => {
            await tx.article.update({
              where: {
                id: article.article.id
              },
              data: {
                qteStock: article.article.qteStock - article.qteVente
              }
            })
          });

          return tx.dette.findFirst({
            where: {
              id: newDateBefore.id
            },
            select: {
              client: true,
              articles: {
                select: {
                  article: {
                    select: {
                      libelle: true,
                      qteStock: true,
                      prix: true
                    }
                  },
                }
              }
            }
          })
        })

        res.status(StatusCodes.OK).send(RestResponse.response(newDette, StatusCodes.OK.valueOf()))

      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(RestResponse.response(error, StatusCodes.INTERNAL_SERVER_ERROR.valueOf()))
      }
  }




}

export default DetteController;
