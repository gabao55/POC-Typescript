import { Request, Response } from 'express';
import { Responsible } from '../protocols/Responsible.js';
import { Task } from '../protocols/Task.js';
import { checkResponsibleId, deleteTaskById, getAllTasks, getResponsibleTasks, insertOneTask, updateTaskStatus } from '../repositories/tasks.repository.js';

async function listTasks (req : Request, res: Response) {
    try {
        const data: Task[] = await getAllTasks();
        return res.send(data);        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function listResponsibleTasks (req: Request, res: Response) {
    const responsibleId: number = Number(req.params.responsibleId); 

    try {
        const responsibleValidation: Responsible[] = await checkResponsibleId(responsibleId);
        if (!responsibleValidation.length) return res.status(404).send('Responsible not found');
    
        const tasks: Task[] = await getResponsibleTasks(responsibleId);
    
        return res.send(tasks);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function insertTask (req: Request, res: Response) {
    const newTask: Task = req.body as Task;
    const responsible: Responsible = res.locals.responsible;

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