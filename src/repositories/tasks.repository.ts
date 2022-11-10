import db from "../db/db.js";
import { QueryResult } from 'pg';
import { ResponsibleEntity } from "../protocols/Responsible.js";
import { Task } from "../protocols/Task.js";

async function DoesTaskExist(taskId: number): Promise<QueryResult<Task[]>> {
    return db.query('SELECT * FROM tasks WHERE id = $1;', [taskId]);
}

function getAllTasks(): Promise<QueryResult<Task[]>> {
    const tasks: Promise<QueryResult<Task[]>> = db.query(
        "SELECT * FROM tasks;"
    );
    return tasks
}

function checkResponsibleId(responsibleId: number): Promise<QueryResult<ResponsibleEntity[]>> {
    return db.query('SELECT * FROM responsibles WHERE id = $1;', [responsibleId]);
}

function getResponsibleTasks(responsibleId: number): Promise<QueryResult<Task[]>> {
    return db.query('SELECT * FROM tasks WHERE responsible_id = $1;', [responsibleId]);
}

async function insertOneTask(taskData: Task): Promise<number> {
    await db.query(`
        INSERT INTO tasks
        (name, description, deadline, responsible_id, responsible)
        VALUES ($1, $2, $3, $4, $5);
    `, [taskData.name, taskData.description, taskData.deadline, taskData.responsibleId, taskData.responsible]);
    
    const taskId = (await db.query('SELECT MAX(id) FROM tasks;')).rows[0].max;

    return taskId;
}

async function updateTaskStatus(taskId: number, responsibleId: number): Promise<boolean> {
    const task: Task[] = (await db.query(`
        SELECT * FROM tasks WHERE id = $1 AND responsible_id = $2;
    `, [taskId, responsibleId])).rows;
    if (!task.length) return false;

    await db.query(`
        UPDATE tasks SET done = $1 WHERE id = $2;
    `, [!task[0].done, task[0].id]);

    return true
}

async function deleteTaskById(taskId: number, responsibleId: number): Promise<boolean> {
    const task: Task[] = (await db.query(`
        SELECT * FROM tasks WHERE id = $1 AND responsible_id = $2;
    `, [taskId, responsibleId])).rows;
    if (!task.length) return false;

    await db.query(`
        DELETE FROM tasks WHERE id = $1;
    `, [task[0].id]);

    return true
}

export {
    DoesTaskExist,
    checkResponsibleId,
    getAllTasks,
    insertOneTask,
    getResponsibleTasks,
    updateTaskStatus,
    deleteTaskById
}