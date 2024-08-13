// types.d.ts
import { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';

// interface JwtPayload extends DefaultJwtPayload {
//   id: number;
//   prenom: string;
//   role: string;
// }

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}



import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: number;
  prenom: string;
  role: string;
}

