import jwt from 'jsonwebtoken';
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { RestResponse } from "../../core/response";

export const authentificated = () : RequestHandler =>{
    const { JSECRET_ACCESS_TOKEN } = process.env;
    return async(req , res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).send(RestResponse.response(null, StatusCodes.UNAUTHORIZED.valueOf(), 'no token provided'))
        }
        jwt.verify(token, `${JSECRET_ACCESS_TOKEN}`, (err, user) =>{
            if (err) {
                return res.status(StatusCodes.UNAUTHORIZED).send(RestResponse.response(err, StatusCodes.UNAUTHORIZED.valueOf(), 'Invalid token'))
            }
            req.body.user = user
            next();
        })
    }
}

export const authorization = (roles: string[]): RequestHandler =>{
    return async (req, res, next) => {
        const {role} = req.body.user
        if (!roles.includes(role)) {
            return res.status(StatusCodes.UNAUTHORIZED).send(RestResponse.response(null, StatusCodes.UNAUTHORIZED.valueOf(), 'Pas d\'autorisation'))
        }
        next();
    }
}