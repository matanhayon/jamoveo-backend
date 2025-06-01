require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function insertIntoCollection(collectionName, data) {
  try {
    await client.connect();
    const db = client.db("Jamoveo");
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(data);
    console.log(
      `✅ Inserted ${result.insertedCount} documents into ${collectionName}.`
    );
  } catch (error) {
    console.error(`❌ Failed to insert into ${collectionName}:`, error);
  } finally {
    await client.close();
  }
}

insertIntoCollection("songs", songs);
