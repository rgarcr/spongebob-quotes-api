import { getDBClient } from "../database/dbConnection.js"
const client = getDBClient();

export class QuoteRepository {
    static async addQuote(name, quote) {
        try {
            await client.connect();
            const db = await client.db("spongebob");
            const quoteColl = await db.collection('spongebob_quotes');
            const doc = { name: name, quote: quote };
            const result = await quoteColl.insertOne(doc);
            console.log(
                `A document was inserted with the _id: ${result.insertedId}`,
            );
        }
        catch (err) {
            console.error("Failed to add quote: ", err.message);
        }
        finally {
            await client.close();
        }
    }

    static async getAllQuotes() {
        try {
            await client.connect();

            const db = await client.db("spongebob");
            const quoteColl = await db.collection('spongebob_quotes');
            const cursor = await quoteColl.find();
            const quotes = await cursor.toArray();
            return quotes;
        }
        catch (err) {
            console.error("Failed to fetch quote: ", err.message);
        }
        finally {
            await client.close();
        }
    }

    static async getQuotesByName(sName) {
        if (!sName || sName.trim().length === 0) return [];
        try {
            await client.connect();

            const db = client.db("spongebob");
            const quoteColl = db.collection('spongebob_quotes');

            const pipeline = [
                {
                    $search: {
                        index: "default",
                        autocomplete: {
                            query: sName,
                            path: 'name',
                            fuzzy: {
                                maxEdits: 1
                            }
                        }
                    }
                },
                {
                    $project: {
                        name: 2,
                        score: { $meta: "searchScore" }
                    }
                },
                { $limit: 10 }

            ];

            return await quoteColl.aggregate(pipeline).toArray();
        }
        catch (err) {
            console.error("Atlas Search Error:", err.message);
            return [];
        }
        finally {
            await client.close();
        }
    }
}