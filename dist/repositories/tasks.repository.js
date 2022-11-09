import { responsibles, tasks } from "../db/data.js";
function getTaskById(taskId) {
    var task = tasks.find(function (task) { return task.id === taskId; });
    return task === undefined ? false : true;
}
function getAllTasks() {
    return tasks;
}
function getResponsibleTasks(responsibleId) {
    var responsibleValidation = responsibles.find(function (responsible) { return responsible.id === responsibleId; });
    if (responsibleValidation === undefined)
        return null;
    return tasks.filter(function (task) { return task.responsibleId === responsibleId; });
}
function insertOneTask(taskData) {
    taskData.id = tasks[tasks.length - 1].id + 1;
    tasks.push(taskData);
    return taskData;
}
function updateTaskStatus(taskId, responsibleId) {
    var task = tasks.find(function (task) { return task.id === taskId; });
    if (task.responsibleId !== responsibleId)
        return false;
    task.done = !task.done;
    return true;
}
function deleteTaskById(taskId, responsibleId) {
    var task = tasks.find(function (task) { return task.id === taskId; });
    if (task.responsibleId !== responsibleId)
        return false;
    tasks.splice(taskId - 1, 1);
    return true;
}
export { getTaskById, getAllTasks, insertOneTask, getResponsibleTasks, updateTaskStatus, deleteTaskById };
