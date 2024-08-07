"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_controller_1 = __importDefault(require("../controllers/article.controller"));
const routerArticle = (0, express_1.Router)();
const articleController = new article_controller_1.default();
routerArticle.post('/', articleController.create);
routerArticle.get('/', articleController.getAll);
routerArticle.get('/:id', articleController.getById);
routerArticle.post('/libelle', articleController.getByLibelle);
exports.default = routerArticle;
