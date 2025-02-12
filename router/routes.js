import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
    res.send("Log all games");
});

router.get("/create", (req, res, next) => {
    res.send("Create a game");
});

router.get("/:id", (req, res, next) => {
    res.send("Log the selected games");
});

router.get("/edit/:id", (req, res, next) => {
    res.send("Edit a game");
});

router.post("/create", (req, res, next) => {
    res.send("Store the game created");
});

router.put("/edit/:id", (req, res, next) => {
    res.send("Update the game edited");
});

router.delete("/:id", (req, res, next) => {
    res.send("Delete a game");
});

export default router;