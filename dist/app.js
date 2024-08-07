"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const article_route_1 = __importDefault(require("./routes/article.route"));
const client_route_1 = __importDefault(require("./routes/client.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/articles", article_route_1.default);
app.use("/api/v1/clients", client_route_1.default);
exports.default = app;
