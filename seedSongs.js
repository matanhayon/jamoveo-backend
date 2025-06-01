require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

const songs = [
  {
    name: "Hey Jude",
    song: [
      [
        { lyrics: "Hey" },
        { lyrics: "Jude", chords: "F" },
        { lyrics: "don't" },
        { lyrics: "make" },
        { lyrics: "it" },
        { lyrics: "bad", chords: "C" },
      ],
      [
        { lyrics: "Take" },
        { lyrics: "a" },
        { lyrics: "sad", chords: "C7" },
        { lyrics: "song", chords: "C4/7" },
        { lyrics: "and" },
        { lyrics: "make" },
        { lyrics: "it" },
        { lyrics: "better", chords: "F" },
      ],
      [
        { lyrics: "Remember", chords: "Bb" },
        { lyrics: "to" },
        { lyrics: "let" },
        { lyrics: "her" },
        { lyrics: "into" },
        { lyrics: "your" },
        { lyrics: "heart", chords: "F" },
      ],
      [
        { lyrics: "Then" },
        { lyrics: "you" },
        { lyrics: "can" },
        { lyrics: "start", chords: "C" },
        { lyrics: "to" },
        { lyrics: "make", chords: "C7" },
        { lyrics: "it" },
        { lyrics: "better", chords: "F" },
      ],
    ],
  },
];

async function seedSongs() {
  try {
    await client.connect();
    const db = client.db("Jamoveo");
    const collection = db.collection("songs");

    await collection.deleteMany({});
    await collection.insertMany(songs);

    console.log("✅ Songs seeded successfully.");
  } catch (error) {
    console.error("❌ Failed to seed songs:", error);
  } finally {
    await client.close();
  }
}

seedSongs();
