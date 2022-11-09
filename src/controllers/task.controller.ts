import { Request, Response } from 'express';
import { tasks } from '../db/data.js';
import { Responsible } from '../protocols/Responsible.js';
import { Task } from '../protocols/Task.js';
import { deleteTaskById, getAllTasks, getResponsibleTasks, insertOneTask, updateTaskStatus } from '../repositories/tasks.repository.js';

function listTasks (req : Request, res: Response) {
    const data: Task[] = getAllTasks();
    return res.send(data);
}

function listResponsibleTasks (req: Request, res: Response) {
    const responsibleId: number = Number(req.params.responsibleId); 
    const tasks: Task[] = getResponsibleTasks(responsibleId);

    if (!tasks) return res.status(404).send("User not found");

    return res.send(tasks);
}

function insertTask (req: Request, res: Response) {
    const newTask: Task = req.body as Task;
    const responsible: Responsible = res.locals.responsible;

    newTask.id = tasks.length + 1;
    newTask.responsibleId = responsible.id
    newTask.responsible = responsible.name;
    newTask.done = false;

    const insertedTask: Task = insertOneTask(newTask);

    return res.status(201).send(`Task inserted with id ${insertedTask.id}`);
}

function switchTaskStatus (req: Request, res: Response) {
    const taskId: number = Number(req.params.taskId); 
    const responsibleId: number = res.locals.responsible.id;

    const isTaskUpdated: boolean = updateTaskStatus(taskId, responsibleId);
    if (!isTaskUpdated) return res.status(401).send("This task does not belong to you");

    return res.sendStatus(202);
}

function deleteTask (req: Request, res: Response ) {
    const taskId: number = Number(req.params.taskId); 
    const responsibleId: number = res.locals.responsible.id;

    const isTaskDeleted: boolean = deleteTaskById(taskId, responsibleId);
    if (!isTaskDeleted) return res.status(401).send("This task does not belong to you");

    return res.sendStatus(204);

}

export {
    listTasks,
    insertTask,
    listResponsibleTasks,
    switchTaskStatus,
    deleteTask
};