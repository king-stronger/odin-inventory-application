import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import routes from './router/routes.js';
import errorHandler from './middlewares/errorHandler.js';

const port = process.env.PORT || 5000;

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Init the app
const app = express();

// Express middlewares to handle form or json data submission
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set ejs template engine
app.set("view engine", "ejs");
app.set("views", path.join(dirname, "views"));

// Game routes
app.use("/games", routes);

// Handle page not found
app.use((req, res, next) => {
    const error = new Error("Could not find the page you're looking for !");
    error.status = 404;
    next(error);
});

// Handle global errors
app.use(errorHandler);

// Listening on the port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})