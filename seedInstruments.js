require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);
const instruments = [
  { name: "vocals", displayName: "Vocals", isShowingChords: false },
  { name: "guitar", displayName: "Guitar", isShowingChords: true },
  { name: "bass", displayName: "Bass", isShowingChords: true },
  { name: "drums", displayName: "Drums", isShowingChords: true },
  { name: "keyboard", displayName: "Keyboard", isShowingChords: true },
  { name: "saxophone", displayName: "Saxophone", isShowingChords: true },
];

async function seed() {
  try {
    await client.connect();
    const db = client.db("Jamoveo");
    const collection = db.collection("instruments");

    await collection.deleteMany();
    await collection.insertMany(instruments);

    console.log("✅ Instruments seeded");
  } catch (error) {
    console.error("❌ Failed to seed instruments:", error);
  } finally {
    await client.close();
  }
}

seed();
