import { responsibles } from "../db/data.js";
function getResponsible(token) {
    return responsibles.find(function (responsibleData) { return responsibleData.token === token; });
}
export { getResponsible };
