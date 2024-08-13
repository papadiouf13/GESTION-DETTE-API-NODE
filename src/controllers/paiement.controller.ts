import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import app from '../app';
import { RestResponse } from '../core/response';

class PaiementController {
    async create(req: Request, res: Response) {
        const { montant, detteId } = req.body;

        // Vérification de l'existence de la dette associée
        const dette = await app.prisma.dette.findUnique({ where: { id: detteId } });
        if (!dette) {
            return res.status(StatusCodes.NOT_FOUND).send(RestResponse.response(null, StatusCodes.NOT_FOUND.valueOf(), "Dette non trouvée"));
        }

        // Calcul du montant restant dû
        const montantRestant = dette.montant - dette.montantVerser;

        // Vérification si le montant payé est supérieur au restant
        if (montant > montantRestant) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(RestResponse.response(null, StatusCodes.UNPROCESSABLE_ENTITY.valueOf(), "Le montant dépasse le total restant de la dette."));
        }

        // Création du paiement
        const paiement = await app.prisma.paiement.create({
            data: {
                montant,
                detteId,
            },
        });

        // Mise à jour des montants dans la dette
        await app.prisma.dette.update({
            where: { id: detteId },
            data: {
                montantVerser: { increment: montant }, // Mise à jour du montant versé
                montantDue: { decrement: montant },     // Mise à jour du montant dû
            },
        });

        // Vérifier si la dette est complètement payée
        const nouvelleDette = await app.prisma.dette.findUnique({ where: { id: detteId } });
        const message = montantRestant - montant > 0 
            ? `Paiement effectué! Montant restant de la dette: ${montantRestant - montant}` 
            : "Cette dette est payée au complet.";

        return res.status(StatusCodes.CREATED).send(RestResponse.response({ paiement, nouvelleDette, message }, StatusCodes.CREATED.valueOf(), "Paiement créé avec succès"));
    }
}

export default PaiementController;
