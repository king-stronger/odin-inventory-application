import path from 'path';
import { fileURLToPath } from 'url';
import db from "../db/queries.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));


async function getAllGames (req, res, next) {
    try {
        const games = await db.all();
        res.status(200).render("games/all", { games });
    } catch (error) {
        error.status = 500;
        next(error);
    }
}

async function findGame (req, res, next) {
    try {
        let id = req.params.id;
        const game = await db.find(id);
    
        res.status(200).render("games/show", { game });
    } catch (error) {
        error.status = 500;
        next(error);
    }
}

async function createGame (req, res, next) {
    res.render("games/create");
}

async function storeGame (req, res, next) {
    try {
        let data = req.body;
        let result = await db.store(data);
        
        if(result){
            res.redirect("/games/" + result)
        } else {
            throw new Error("Could not store the game in the database");
        }
    } catch (error) {
        error.status = 500;
        next(error);
    }
}

async function editGame (req, res, next) {
    try {
        let id = req.params.id;
        const game = await db.find(id);
    
        if(game){
            res.render("games/edit", { game });
        } else {
            throw new Error("Could not store the game in the database");
        }
    } catch (error) {
        error.status = 500;
        next(error);
    }
}

async function updateGame (req, res, next) {
    try {
        let data = req.body;
        let id = req.params.id;
        let result = await db.update(id, data);
    
        if(result){
            res.json({ result })
        }  else {
            throw new Error("Could not store the game in the database");
        }
    } catch (error) {
        error.status = 500;
        next(error);
    }
}

async function deleteGame (req, res, next) {
    try {
        let id = req.params.id;
        let result = await db.destroy(id);
        
        if(result){
            res.redirect("/games/")
        } else {
            throw new Error("Could not delete the game in the database");
        }
    } catch (error) {
        error.status = 500;
        next(error);
    }
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