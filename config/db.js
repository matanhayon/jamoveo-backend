require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

let client;
let db;
let usersCollection;
let instrumentsCollection;
let songsCollection;

async function connectDB() {
  if (db) return db;

  client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  db = client.db("Jamoveo");
  usersCollection = db.collection("users");
  instrumentsCollection = db.collection("instruments");
  songsCollection = db.collection("songs");

  console.log("✅ Connected to MongoDB Atlas");
  return {
    usersCollection,
    instrumentsCollection,
    songsCollection,
  };
}

async function insertIntoCollection(collectionName, data) {
  if (!db) {
    await connectDB();
  }

  try {
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(data);
    console.log(
      `✅ Inserted ${result.insertedCount} documents into ${collectionName}.`
    );
  } catch (error) {
    console.error(`❌ Failed to insert into ${collectionName}:`, error);
  }
}

module.exports = {
  connectDB,
  getCollections: () => ({
    usersCollection,
    instrumentsCollection,
    songsCollection,
  }),
  insertIntoCollection,
};
