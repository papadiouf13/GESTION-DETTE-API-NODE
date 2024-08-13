import { z } from 'zod'

export const clientPostSchema = z.object ({
    prenom: z.string({
        required_error: "le prenom est obligatoire",
    }),
    nom: z.string({
        required_error: "le nom est obligatoire",
    }),

    telephone: z.string({
        required_error: "le telephone est obligatoire",
    }).length(9, "le numero doit contenir 9 chiffres")
    
})