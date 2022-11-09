type Task = {
    id?: number,
    name: string,
    description: string,
    deadline: string | Date,
    responsibleId?: number,
    responsible?: string,
    done: boolean,
};

export { Task };