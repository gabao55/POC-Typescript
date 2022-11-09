import { getTaskById } from '../repositories/tasks.repository.js';
function validateTaskId(req, res, next) {
    var taskId = Number(req.params.taskId);
    var taskValidation = getTaskById(taskId);
    if (!taskValidation)
        return res.status(404).send("This task does not exist");
    next();
}
export { validateTaskId, };
