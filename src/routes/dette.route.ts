import { Router } from "express";
import DetteController from "../controllers/dette.controller";

const routerDette = Router()
const detteController = new DetteController

routerDette.post("/", detteController.create)

export default routerDette