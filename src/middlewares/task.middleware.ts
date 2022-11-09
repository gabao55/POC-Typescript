import { Request, Response, NextFunction } from 'express';
import { getTaskById } from '../repositories/tasks.repository.js';

function validateTaskId (req: Request, res: Response, next: NextFunction) {
    const taskId: number = Number(req.params.taskId);
    
    const taskValidation: boolean = getTaskById(taskId);
    if (!taskValidation) return res.status(404).send("This task does not exist");

    next();
}

export {
    validateTaskId,
}