import express from 'express';
import routes from './router/routes.js';

const port = process.env.PORT || 5000;

// Init the app
const app = express();

// Express middlewares to handle form or json data submission
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Game routes
app.use("/games", routes)

// Listening on the port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})