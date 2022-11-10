import { Request, Response, NextFunction } from 'express';
import { ResponsibleEntity } from '../protocols/Responsible.js';
import { getResponsible } from '../repositories/auth.repository.js';

async function validateToken (req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.sendStatus(401);
    }

    const responsible: ResponsibleEntity = (await getResponsible(token)).rows[0];
    if (responsible === undefined) return res.status(404).send("User not found");
    
    res.locals.responsible = responsible;

    next();
}

export {
    validateToken,
}