import { Responsible } from "../protocols/Responsible.js";
import { Task } from "../protocols/Task.js";

let tasks: Task[] = [
    {
        id: 1,
        name: "Wash dishes",
        description: "Wash all dishes",
        deadline: "15/11/2022",
        responsibleId: 2,
        responsible: "Lucas",
        done: false,
    },
    {
        id: 2,
        name: "Clean toilet",
        description: "Clean all dishes",
        deadline: "15/11/2022",
        responsibleId: 3,
        responsible: "Claudio",
        done: false,
    },
    {
        id: 3,
        name: "Feed dog",
        description: "Feed dog 2 times per day",
        deadline: "15/11/2022",
        responsibleId: 1,
        responsible: "Gabriel",
        done: false,
    }
]

const responsibles: Responsible[] = [
    {
        id: 1,
        name: "Gabriel",
        token: "gabriel123"
    },
    {
        id: 2,
        name: "Lucas",
        token: "lucas123"
    },
    {
        id: 3,
        name: "Claudio",
        token: "claudio123"
    },

]

export {
    tasks,
    responsibles
};