import { responsibles, tasks } from "../db/data.js";
import { Responsible } from "../protocols/Responsible.js";
import { Task } from "../protocols/Task.js";

function getTaskById(taskId: number): boolean {
    const task: Task | undefined = tasks.find(task => task.id === taskId);
    return task === undefined ? false : true;
}

function getAllTasks(): Task[] {
    return tasks
}

function getResponsibleTasks(responsibleId: number): Task[] | null {
    const responsibleValidation: Responsible | undefined = responsibles.find(responsible => responsible.id === responsibleId);
    if (responsibleValidation === undefined) return null

    return tasks.filter(task => task.responsibleId === responsibleId);
}

function insertOneTask(taskData: Task): Task {
    taskData.id = tasks[tasks.length-1].id + 1;
    tasks.push(taskData);
    return taskData;
}

function updateTaskStatus(taskId: number, responsibleId: number): boolean {
    const task: Task = tasks.find(task => task.id === taskId);
    if (task.responsibleId !== responsibleId) return false;

    task.done = !task.done;

    return true
}

function deleteTaskById(taskId: number, responsibleId: number) {
    const task: Task = tasks.find(task => task.id === taskId);
    if (task.responsibleId !== responsibleId) return false;

    tasks.splice(taskId-1, 1);

    return true
}

export {
    getTaskById,
    getAllTasks,
    insertOneTask,
    getResponsibleTasks,
    updateTaskStatus,
    deleteTaskById
}