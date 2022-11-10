import { Request, Response, NextFunction } from 'express';
import { DoesTaskExist } from '../repositories/tasks.repository.js';
import { QueryResult } from 'pg';
import { Task } from "../protocols/Task.js";


async function validateTaskId (req: Request, res: Response, next: NextFunction) {
    const taskId: number = Number(req.params.taskId);
    
    const taskValidation: QueryResult<Task[]> = await DoesTaskExist(taskId);
    if (!taskValidation.rowCount) return res.status(404).send("This task does not exist");

    next();
}

export {
    validateTaskId,
}