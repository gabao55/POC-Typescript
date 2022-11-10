import { Request, Response } from 'express';
import { Responsible, ResponsibleEntity } from '../protocols/Responsible.js';
import { Task } from '../protocols/Task.js';
import { QueryResult } from 'pg';
import { checkResponsibleId, deleteTaskById, getAllTasks, getResponsibleTasks, insertOneTask, updateTaskStatus } from '../repositories/tasks.repository.js';
import { TaskSchema } from '../schemas/task.schema.js';

async function listTasks (req : Request, res: Response) {
    try {
        const data: QueryResult<Task[]> = await getAllTasks();
        return res.send(data.rows);        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function listResponsibleTasks (req: Request, res: Response) {
    const responsibleId: number = Number(req.params.responsibleId); 

    try {
        const responsibleValidation: QueryResult<Responsible[]> = await checkResponsibleId(responsibleId);
        if (!responsibleValidation.rowCount) return res.status(404).send('Responsible not found');
    
        const tasks: QueryResult<Task[]> = await getResponsibleTasks(responsibleId);
    
        return res.send(tasks.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function insertTask (req: Request, res: Response) {
    const newTask: Task = req.body as Task;
    const validation = TaskSchema.validate(newTask, { abortEarly: false });
    if (validation.error) {
        const message = validation.error.details.map(e => e.message);
        return res.status(422).send(message);
    }

    const responsible: ResponsibleEntity = res.locals.responsible;
    newTask.responsibleId = responsible.id
    newTask.responsible = responsible.name;

    try {
        const insertedTask: number = await insertOneTask(newTask);
    
        return res.status(201).send(`Task inserted with id ${insertedTask}`);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function switchTaskStatus (req: Request, res: Response) {
    const taskId: number = Number(req.params.taskId); 
    const responsibleId: number = res.locals.responsible.id;

    try {
        const isTaskUpdated: boolean = await updateTaskStatus(taskId, responsibleId);
        if (!isTaskUpdated) return res.status(401).send("This task does not belong to you");
    
        return res.sendStatus(202);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function deleteTask (req: Request, res: Response ) {
    const taskId: number = Number(req.params.taskId); 
    const responsibleId: number = res.locals.responsible.id;

    try {
        const isTaskDeleted: boolean = await deleteTaskById(taskId, responsibleId);
        if (!isTaskDeleted) return res.status(401).send("This task does not belong to you");
    
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).send(error.message);
    }

}

export {
    listTasks,
    insertTask,
    listResponsibleTasks,
    switchTaskStatus,
    deleteTask
};