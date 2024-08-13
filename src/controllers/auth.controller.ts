import { Request, Response } from "express";
import Controller from "../core/impl/controller";
import { StatusCodes } from "http-status-codes";
import { RestResponse } from "../core/response";
import app from "../app";
import { Encrypt } from "../helpers/encrypt";

class AuthController  {
    async login(req: Request, res: Response) {
        try {
            const user = await app.prisma.user.findUnique({
                where: {
                    email: req.body.email
                },
                select: {
                    id: true,
                    email: true,
                    password: true,
                    role: true,
                    client: {
                        select: {
                            nom: true,
                            prenom: true,
                            telephone: true
                        }
                    }
                }
            });

            if (user && await Encrypt.comparePassword(req.body.password, user.password)) {
                const token = Encrypt.generateToken({ id: user.id, email: user.email, role: user.role });
                return res.status(StatusCodes.OK).send({ token });
            }

        } catch (error) {
            console.error('Login error:', error); 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                message: 'An error occurred during login'
            });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const hashPassword = await Encrypt.encryptPass(req.body.password);
            const newUser = await app.prisma.user.create({
                data: {
                    email: req.body.email,
                    password: hashPassword,
                    clientId: req.body.clientId
                }
            });

            return res.status(StatusCodes.CREATED).send({
                user: newUser
            });
        } catch (error) {
            console.error('Register error:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                message: 'An error occurred during registration'
            });
        }
    }
    async logout(){
        
    }
  
}

export default AuthController;
