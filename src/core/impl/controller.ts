import { Request, Response } from "express";
import { IController } from "../controller.interface";

export default abstract class Controller implements IController {
    getAll(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getById(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
    create(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
   
}