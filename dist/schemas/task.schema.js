import Joi from 'joi';
var TaskSchema = Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    deadline: Joi.date().required()
});
export { TaskSchema };
