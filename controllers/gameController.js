async function getAllGames (req, res, next) {
    res.send("Log all games");
}

async function findGame (req, res, next) {
    res.send("Create a game");
}

async function createGame (req, res, next) {
    res.send("Log the selected games");
}

async function storeGame (req, res, next) {
    res.send("Edit a game");
}

async function editGame (req, res, next) {
    res.send("Store the game created");
}

async function updateGame (req, res, next) {
    res.send("Update the game edited");
}

async function deleteGame (req, res, next) {
    res.send("Delete a game");
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