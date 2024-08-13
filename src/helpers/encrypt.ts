import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { string } from 'zod';

interface Payload {
    id: number;
    email: string;
    role: string;
}

const { JSECRET_ACCESS_TOKEN, JSECRET_TIME_TO_EXPIRE } = process.env ;

export class Encrypt {
    static async encryptPass(password: string) {
        return bcrypt.hashSync(password, 12);
    }

    static async comparePassword(password: string, hashPassword: string) {
        return await bcrypt.compare(password, hashPassword);
    }

    static generateToken(payload: Payload, expireIn: string = JSECRET_TIME_TO_EXPIRE!) {
        return jwt.sign(payload, `${JSECRET_ACCESS_TOKEN}`, { expiresIn: expireIn });
    }
}
