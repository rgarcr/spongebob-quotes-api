import express from "express"
import {getQuotes, getQuotesByName, getRandomQuote} from "../controllers/quotesController.js"

export const quotesRouter = express.Router()

quotesRouter.get("/", getQuotes);
quotesRouter.get("/random", getRandomQuote);
quotesRouter.get("/search", getQuotesByName);

