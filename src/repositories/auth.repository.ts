import { ResponsibleEntity } from "../protocols/Responsible.js";
import { QueryResult } from 'pg';
import db from "../db/db.js";

async function getResponsible(token: string): Promise<QueryResult<ResponsibleEntity>> {
    return db.query(
        'SELECT * FROM responsibles WHERE token = $1;',
        [token]
    );
}

export {
    getResponsible
};