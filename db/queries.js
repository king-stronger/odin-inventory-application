import pool from "./pools.js";

const allowedTables = ["games", "genres", "developers"];
const allowedFields = {
    games: ["name", "description", "releasedAt", "developer-id", "genre_id"],
    genres: ["name"],
    developers: ["name"],
}


/**
 * 
 * @param {String} table The table in which to execute the query
 * @param {String} fields The fields to use to retrieve the data
 * @returns Retrieve the data using the table and fields
 */
async function all(table = "games", fields = "*"){
    if(!allowedTables.includes(table)){
        throw new Error("Table not allowed");
    }

    if(fields !== "*"){
        fields.split(",").forEach(field => {
            const trimmedField = field.trim();
            if(!allowedFields[table].includes(trimmedField)){
                throw new Error(`Field '${trimmedField}' not allowed in ${table}`);
            }
        });
    }

    const query = `SELECT ${fields} from ${table}`;

    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error("Database query failed :" + error.message);
    }
}

/**
 * 
 * @param {INTEGER} id The id of the selected game
 * @param {*} table The table in which to execute the query
 * @param {*} fields The fields to use to retrieve the data
 * @returns Retrieve the data of one game
 */
async function find(id, table = "games", fields = "*"){
    if(!allowedTables.includes(table)){
        throw new Error("Table not allowed");
    }

    if(fields !== "*"){
        fields.split(",").forEach(field => {
            const trimmedField = field.trim();
            if(!allowedFields[table].includes(trimmedField)){
                throw new Error(`Field '${trimmedField} not allowed in '${table}`)
            }
        });
    }

    const query = `SELECT ${fields} from ${table} WHERE id=$1`;

    try {
        const { rows } = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        throw new Error("Database query failed : " + error.message );
    }
}


async function destroy (id, table = "games"){
    if(!allowedTables.includes(table)){
        throw new Error("Table not allowed");
    }

    const query = `DELETE from ${table} WHERE id=$1`;

    try {
        const result = await pool.query(query, [id]);
        
        if(result.rowCount === 0){
            throw new Error(`No record found with id ${id} to delete`)
        }

        return result.rowCount;
    } catch (error) {
        throw new Error("Database query failed : " + error.message );
    }
}