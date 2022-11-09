import { Responsible } from "../protocols/Responsible.js";
import db from "../db/db.js";

async function getResponsible(token: string): Promise<Responsible> {
    const responsible: Responsible = (await db.query(
        'SELECT * FROM responsibles WHERE token = $1;',
        [token]
    )).rows[0];

    return responsible;
}

export {
    getResponsible
};