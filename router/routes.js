import { Router } from "express";
import { 
    getAllGames,
    findGame,
    createGame,
    storeGame,
    editGame,
    updateGame,
    deleteGame
} from "../controllers/gameController";

const router = Router();

router.get("/", getAllGames);

router.get("/create", createGame);

router.get("/:id", findGame);

router.get("/edit/:id", editGame);

router.post("/create", storeGame);

router.put("/edit/:id", updateGame);

router.delete("/:id", deleteGame);

export default router;