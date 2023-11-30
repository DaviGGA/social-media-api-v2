import express from "express";

const PORT = 3002;




const app: express.Application = express();
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server online on port ${PORT}`)
})