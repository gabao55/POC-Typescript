import { tasks } from '../db/data.js';
import { deleteTaskById, getAllTasks, getResponsibleTasks, insertOneTask, updateTaskStatus } from '../repositories/tasks.repository.js';
function listTasks(req, res) {
    var data = getAllTasks();
    return res.send(data);
}
function listResponsibleTasks(req, res) {
    var responsibleId = Number(req.params.responsibleId);
    var tasks = getResponsibleTasks(responsibleId);
    if (!tasks)
        return res.status(404).send("User not found");
    return res.send(tasks);
}
function insertTask(req, res) {
    var newTask = req.body;
    var responsible = res.locals.responsible;
    newTask.id = tasks.length + 1;
    newTask.responsibleId = responsible.id;
    newTask.responsible = responsible.name;
    newTask.done = false;
    var insertedTask = insertOneTask(newTask);
    return res.status(201).send("Task inserted with id ".concat(insertedTask.id));
}
function switchTaskStatus(req, res) {
    var taskId = Number(req.params.taskId);
    var responsibleId = res.locals.responsible.id;
    var isTaskUpdated = updateTaskStatus(taskId, responsibleId);
    if (!isTaskUpdated)
        return res.status(401).send("This task does not belong to you");
    return res.sendStatus(202);
}
function deleteTask(req, res) {
    var taskId = Number(req.params.taskId);
    var responsibleId = res.locals.responsible.id;
    var isTaskDeleted = deleteTaskById(taskId, responsibleId);
    if (!isTaskDeleted)
        return res.status(401).send("This task does not belong to you");
    return res.sendStatus(204);
}
export { listTasks, insertTask, listResponsibleTasks, switchTaskStatus, deleteTask };
