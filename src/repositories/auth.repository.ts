import { responsibles } from "../db/data.js";
import { Responsible } from "../protocols/Responsible.js";

function getResponsible(token: string): Responsible {
    return responsibles.find(responsibleData => responsibleData.token === token);
}

export {
    getResponsible
};