import { Router } from "express";
import { 
    getAllGames,
    findGame,
    createGame,
    storeGame,
    editGame,
    updateGame,
    deleteGame
} from "../controllers/gameController.js";

const router = Router();

// Get all games
router.get("/", getAllGames);

// Send a form to create a game
router.get("/create", createGame);

// Find a game
router.get("/:id", findGame);

// Edit a game
router.get("/edit/:id", editGame);

// Store the game into the database
router.post("/create", storeGame);

// Update the game in the database
router.put("/edit/:id", updateGame);

// Delete the game in the databse
router.delete("/:id", deleteGame);

export default router;