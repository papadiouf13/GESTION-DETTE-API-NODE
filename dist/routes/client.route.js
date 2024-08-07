"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controller_1 = __importDefault(require("../controllers/client.controller"));
const routerClient = (0, express_1.Router)();
const clientController = new client_controller_1.default;
routerClient.post('/', clientController.create);
routerClient.get('/', clientController.getAll);
routerClient.get('/:id', clientController.getById);
routerClient.post('/telephone', clientController.getByTelephone);
exports.default = routerClient;
