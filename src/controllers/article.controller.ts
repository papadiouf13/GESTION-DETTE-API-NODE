import { Request, Response } from "express";
import Controller from "../core/impl/controller";
import prisma from "../core/impl/prisma.model";
import { StatusCodes } from "http-status-codes";
import { RestResponse } from "../core/response";

class ArticleController extends Controller {
  async create(req: Request, res: Response) {
    try {
      const newArticle = await prisma.article.create({
        data: req.body
      });
      res
        .status(StatusCodes.OK)
        .send(RestResponse.response(newArticle, StatusCodes.OK.valueOf()));
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(RestResponse.response(error, StatusCodes.INTERNAL_SERVER_ERROR.valueOf(), 'Erreur Base de données'));
    }
  }

  async getAll(req: Request, res: Response) {
      try {
        const datas = await prisma.article.findMany({
          select: {
            id: true,
            libelle: true,
            qteStock: true,
            prix: true
          }
        })
        res
        .status(StatusCodes.OK)
        .send(RestResponse.response(datas, StatusCodes.OK.valueOf()));
    
      } catch (error) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(RestResponse.response(error, StatusCodes.INTERNAL_SERVER_ERROR.valueOf(), 'Erreur Base de données'));
      }
  }

  async getById(req: Request, res: Response) {
    try {
      const datas = await prisma.article.findFirstOrThrow({
        where: {id: Number.parseInt(req.params.id)},
        select: {
          id: true,
          libelle: true,
          qteStock: true,
          prix: true
        }
      })
      res
      .status(StatusCodes.OK)
      .send(RestResponse.response(datas, StatusCodes.OK.valueOf()));
  
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(RestResponse.response(error, StatusCodes.INTERNAL_SERVER_ERROR.valueOf(), 'Erreur Base de données'));
    }
  }


  async getByLibelle(req: Request, res: Response) {
    try {
      const datas = await prisma.article.findFirstOrThrow({
        where: {libelle: req.body.libelle},
        select: {
          id: true,
          libelle: true,
          qteStock: true,
          prix: true
        }
      })
      res
      .status(StatusCodes.OK)
      .send(RestResponse.response(datas, StatusCodes.OK.valueOf()));
  
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(RestResponse.response(error, StatusCodes.INTERNAL_SERVER_ERROR.valueOf(), 'Erreur Base de données'));
    }
  }

}

export default ArticleController;
