import { MongoClient, ServerApiVersion } from 'mongodb';
import "dotenv/config"

const uri = process.env.MONGODB_URI;
export function getDBClient() {
    if (!uri) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: false,
            deprecationErrors: true,
        }
    });
    return client;
}



