import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model, Schema } from "mongoose";

let mongo: MongoMemoryServer;
let connection: Connection;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    connection = (await mongoose.connect(uri, {})).connection;
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany();
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await connection.close();
});

export const getModel = (model: string, schema: Schema): Model<any> => {
    if (connection) return connection.model(model, schema);
};
