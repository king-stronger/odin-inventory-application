import pool from "./pools.js";

const allowedTables = ["games", "genres", "developers"];
const allowedFields = {
    games: ["name", "description", "releasedAt", "developer-id", "genre_id"],
    genres: ["name"],
    developers: ["name"],
}
