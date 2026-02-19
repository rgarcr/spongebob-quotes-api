import { QuoteRepository } from "../models/QuoteRepositry.js"
import { getRandomInt } from "../utils/getRandomInt.js"

export async function getQuotes(req, res) {
    try {
        const quotes = await QuoteRepository.getAllQuotes();
        res.json(quotes);
    }
    catch (err) {
        res.status(500).json({
            error: "Failed to fetch quotes",
            details: err.message
        })
    }
}

export async function getQuotesByName(req, res) {
    try {
        const quotes = await QuoteRepository.getQuotesByName(req.query.name);
        res.json(quotes);
    }
    catch (err) {
        res.status(500).json({
            error: "Failed to fetch quotes",
            details: err.message
        })
    }
}

export async function getRandomQuote(req, res) {
    try {
        const quotes = await QuoteRepository.getAllQuotes();
        const max = quotes.length;
        const randomInt = getRandomInt(max)
        const randomQuote = quotes[randomInt]
        console.log(randomInt, randomQuote)
        res.json(randomQuote);
    }
    catch (err) {
        res.status(500).json({
            error: "Failed to fetch random quote",
            details: err.message
        })
    }
}