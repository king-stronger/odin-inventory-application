import express from 'express';
import routes from './router/routes.js';

const port = process.env.PORT || 5000;

//Init the app
const app = express();

//Main router
app.use("/", routes)

//Listening on the port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})