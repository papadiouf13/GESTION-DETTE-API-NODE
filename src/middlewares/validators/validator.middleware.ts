import { z, ZodError } from "zod";
import { RequestHandler } from "express";
import { articlePostSchema } from "./schema/article.schema";
import { clientPostSchema } from "./schema/client.schema";
import { paiementPostSchema } from './schema/paiement.schema';
import { StatusCodes } from "http-status-codes";
import { RestResponse } from "../../core/response";
import { ResponseValidator, supportedMethods } from "./response.validator";

// Définition du schéma avec la syntaxe corrigée
const schemas: { [key: string]: z.ZodObject<any, any> } = {
    "post/api/v1/articles": articlePostSchema,
    "post/api/v1/clients": clientPostSchema,
    "post/api/v1/paiements": paiementPostSchema
};

const validatorSchema = (): RequestHandler => {
    return async (req, res, next) => {
        // Méthode de la requête
        const method = req.method.toLowerCase();
        if (!supportedMethods.includes(method)) {
            return next();
        }
        // Validation
        try {
            const schemaKey = `${method}${req.originalUrl}`
            await schemas[schemaKey].parseAsync(req.body);
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                const responseValidator: ResponseValidator = {
                    errors: error.errors.map((issue) => ({
                        message: `${issue.path.join('.')} ${issue.message}`
                    })),
                    status: false
                };

                return res
                    .status(StatusCodes.UNPROCESSABLE_ENTITY)
                    .send(RestResponse.response(responseValidator, StatusCodes.UNPROCESSABLE_ENTITY.valueOf(), "Erreur de validation"));
            }

            // En cas d'autres erreurs (optionnel)
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(RestResponse.response({ status: false, data: "Erreur interne du serveur" }, StatusCodes.INTERNAL_SERVER_ERROR.valueOf()));
        }
    };
};

export default validatorSchema;
