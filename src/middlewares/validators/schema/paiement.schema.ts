import { z } from 'zod';

export const paiementPostSchema = z.object({
    montant: z.number().positive({ message: "Le montant doit être positif" }),
    detteId: z.number().int({ message: "L'ID de la dette doit être un entier" }),
});
