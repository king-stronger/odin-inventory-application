import express from 'express';

const port = process.env.PORT || 5000;

//Init the app
const app = express();


//Listening on the port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})