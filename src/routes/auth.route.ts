import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { authentificated, authorization } from "../middlewares/auth/authentification";

const routerAuth = Router();
const authController = new AuthController();

routerAuth.post("/register",[authentificated(), authorization(["ADMIN"])], authController.register);
routerAuth.post("/login", authController.login);
routerAuth.get("/logout", authController.logout);

export default routerAuth;