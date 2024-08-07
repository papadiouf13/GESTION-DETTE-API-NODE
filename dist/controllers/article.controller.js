"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("../core/impl/controller"));
const prisma_model_1 = __importDefault(require("../core/impl/prisma.model"));
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../core/response");
class ArticleController extends controller_1.default {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newArticle = yield prisma_model_1.default.article.create({
                    data: req.body
                });
                res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .send(response_1.RestResponse.response(newArticle, http_status_codes_1.StatusCodes.OK.valueOf()));
            }
            catch (error) {
                res
                    .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(response_1.RestResponse.response(error, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR.valueOf(), 'Erreur Base de données'));
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const datas = yield prisma_model_1.default.article.findMany({
                    select: {
                        id: true,
                        libelle: true,
                        qteStock: true,
                        prix: true
                    }
                });
                res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .send(response_1.RestResponse.response(datas, http_status_codes_1.StatusCodes.OK.valueOf()));
            }
            catch (error) {
                res
                    .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(response_1.RestResponse.response(error, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR.valueOf(), 'Erreur Base de données'));
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const datas = yield prisma_model_1.default.article.findFirstOrThrow({
                    where: { id: Number.parseInt(req.params.id) },
                    select: {
                        id: true,
                        libelle: true,
                        qteStock: true,
                        prix: true
                    }
                });
                res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .send(response_1.RestResponse.response(datas, http_status_codes_1.StatusCodes.OK.valueOf()));
            }
            catch (error) {
                res
                    .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(response_1.RestResponse.response(error, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR.valueOf(), 'Erreur Base de données'));
            }
        });
    }
    getByLibelle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const datas = yield prisma_model_1.default.article.findFirstOrThrow({
                    where: { libelle: req.body.libelle },
                    select: {
                        id: true,
                        libelle: true,
                        qteStock: true,
                        prix: true
                    }
                });
                res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .send(response_1.RestResponse.response(datas, http_status_codes_1.StatusCodes.OK.valueOf()));
            }
            catch (error) {
                res
                    .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(response_1.RestResponse.response(error, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR.valueOf(), 'Erreur Base de données'));
            }
        });
    }
}
exports.default = ArticleController;
