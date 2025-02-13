import pool from "./pools.js";

const allowedTables = ["games", "genres", "developers"];
const allowedFields = {
    games: ["name", "description", "released_at", "developer_id", "genre_id"],
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

/**
 * 
 * @param {Object} data The data to stored in the database 
 * @param {*} table The table in which to execute the query
 * @returns Returns the id of the new item stored in the database
 */
async function store(data, table = "games"){
    if(!allowedTables.includes(table)){
        throw new Error("Table not allowed");
    }

    let fields = Object.keys(data);

    fields.forEach(field => {
        if(!allowedFields[table].includes(field)){
            throw new Error(`Field '${field}' not allowed in ${table}`);
        }
    });

    let fieldsQuery = fields.join(",");
    let valuesParameters = fields.map((_, index) => `$${index + 1}`).join(","); 

    let query = `
        INSERT INTO ${table} (${fieldsQuery})
        VALUES (${valuesParameters})
        RETURNING id;
    `;

    try {
        const result = await pool.query(query, Object.values(data));

        if(result.rowCount === 0){
            throw new Error("No rows were inserted")
        }

        return result.rows[0].id;
    } catch (error) {
        throw new Error("Database query failed : " + error.message);
    }
}

/**
 * 
 * @param {Integer} id The id of the item to update
 * @param {Object} data The new data for the update
 * @param {String} table The table in which to execute the query
 * @returns Returns the number of rows affected
 */
async function update(id, data, table = "games"){
    if(!allowedTables.includes(table)){
        throw new Error("Table not allowed");
    }

    let fields = Object.keys(data);

    fields.forEach(field => {
        if(!allowedFields[table].includes(field)){
            throw new Error(`Field '${field}' not allowed in ${table}`);
        }
    });

    let fieldsQuery = fields
        .map((field, index) => {
            return `${field}=$${index + 1}`
        })
        .join(",");

    let query = `
        UPDATE ${table} 
        SET ${fieldsQuery} 
        WHERE id = $${fields.length + 1};
    `;

    try {
        const result = await pool.query(query, [...Object.values(data), id]);
        return result.rowCount;
    } catch (error) {
        throw new Error("Database query failed :" + error.message);
    }
}

/**
 * 
 * @param {Integer} id The id of the item to delete
 * @param {String} table The table in which to execute the query
 * @returns Returns the number of rows affected
 */
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

export default {
    all,
    find,
    store,
    update,
    destroy
}