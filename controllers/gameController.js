import path from 'path';
import { fileURLToPath } from 'url';
import db from "../db/queries.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));


async function getAllGames (req, res, next) {
    const games = await db.all();

    res.status(200).render("games/all", { games });
}

async function findGame (req, res, next) {
    let id = req.params.id;
    const game = await db.find(id);

    res.status(200).render("games/show", { game });
}

async function createGame (req, res, next) {
    res.render("games/create");
}

async function storeGame (req, res, next) {
    let data = req.body;
    let result = await db.store(data);
    
    if(result){
        res.redirect("/games/" + result)
    }
}

async function editGame (req, res, next) {
    res.send("Edit the game created");
}

async function updateGame (req, res, next) {
    let data = req.body;
    let id = req.params.id;
    let result = await db.update(id, data);
    res.json({result});
}

async function deleteGame (req, res, next) {
    let id = req.params.id;
    let result = await db.destroy(id);
    res.json({result});
}

export {
    getAllGames,
    findGame,
    createGame,
    storeGame,
    editGame,
    updateGame,
    deleteGame
}