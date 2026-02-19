import express from "express"
import { quotesRouter } from "./routes/quotes.js"
import cors from "cors"
import "dotenv/config"

const app = express();
const PORT = 8080;
const __dirname = import.meta.dirname;


try {
    app.use(cors());
    app.use(express.static('public'))
    app.use('/api/quotes', quotesRouter);

    app.use((req, res) => {
        res.status(404).send("404 Error")
    })

    app.listen(process.env.port || PORT, () => {
        console.log(`Running on port ${PORT}`);
    })
}
catch (err) {
    console.error('Error getting Data: ', err.message)
}