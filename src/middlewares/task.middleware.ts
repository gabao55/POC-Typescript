import { Request, Response, NextFunction } from 'express';
import { DoesTaskExist } from '../repositories/tasks.repository.js';

async function validateTaskId (req: Request, res: Response, next: NextFunction) {
    const taskId: number = Number(req.params.taskId);
    
    const taskValidation: boolean = await DoesTaskExist(taskId);
    if (!taskValidation) return res.status(404).send("This task does not exist");

    next();
}

export {
    validateTaskId,
}