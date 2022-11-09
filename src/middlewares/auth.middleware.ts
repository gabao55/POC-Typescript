import { Request, Response, NextFunction } from 'express';
import { Responsible } from '../protocols/Responsible.js';
import { getResponsible } from '../repositories/auth.repository.js';

function validateToken (req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.sendStatus(401);
    }

    const responsible: Responsible = getResponsible(token);
    res.locals.responsible = responsible;

    next();
}

export {
    validateToken,
}