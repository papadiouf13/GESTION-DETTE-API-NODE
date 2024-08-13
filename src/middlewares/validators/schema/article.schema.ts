import { z } from 'zod'
import app from '../../../app';

export const verifyLibelle = async (value: string) => {
    const count = await app.prisma.article.count({
        where: {
            libelle: value
        }
    })
    return count < 1;
}

export const articlePostSchema = z.object ({
    libelle: z.string({
        required_error: "le libelle est obligatoire",
    }).min(3).max(30)
    .refine(verifyLibelle, "existe deja"),
    prix: z.number().positive({
        message: "le prix doit etre positive"
    }),
    qteStock: z.number().positive({
        message: "la qteStock doit etre positive"
    }),
})