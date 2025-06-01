require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

const songs = [
  {
    name: "Veech shelo",
    artist: "Ariel Zilber",
    imageurl:
      "https://i.discogs.com/gN1N46vKW_lHUnlBDr3ZWFT4tQ-VuTKtkJIXdAaw1rM/rs:fit/g:sm/q:90/h:599/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzMjQx/OTk3LTE2NTg2ODEx/ODQtOTczOC5qcGVn.jpeg",
    song: [
      [
        { lyrics: "ואיך" },
        { lyrics: "שלא", chords: "Em" },
        { lyrics: "אפנה" },
        { lyrics: "לראות", chords: "Em/D" },
      ],
      [
        { lyrics: "תמיד" },
        { lyrics: "איתה", chords: "Cmaj7" },
        { lyrics: "ארצה" },
        { lyrics: "להיות", chords: "G" },
      ],
      [
        { lyrics: "שומרת" },
        { lyrics: "לי", chords: "Em" },
        { lyrics: "היא" },
        { lyrics: "אמונים", chords: "Em/D" },
      ],
      [
        { lyrics: "לא" },
        { lyrics: "מתרוצצת", chords: "Cmaj7" },
        { lyrics: "בגנים", chords: "G" },
      ],
      [
        { lyrics: "ובלילות", chords: "E" },
        { lyrics: "ובלילות", chords: "Em/D" },
      ],
      [
        { lyrics: "עולות" },
        { lyrics: "עולות", chords: "Cmaj7" },
        { lyrics: "בי" },
        { lyrics: "מנגינות", chords: "G" },
      ],
      [
        { lyrics: "וזרם" },
        { lyrics: "דק", chords: "E" },
        { lyrics: "קולח", chords: "Em/D" },
      ],
      [
        { lyrics: "ותפילותי", chords: "Cmaj7" },
        { lyrics: "לרוח" },
        { lyrics: "נענות", chords: "G" },
      ],
    ],
  },
];

async function seedSongs() {
  try {
    await client.connect();
    const db = client.db("Jamoveo");
    const collection = db.collection("songs");

    //await collection.deleteMany({});
    await collection.insertMany(songs);

    console.log("✅ Songs seeded successfully.");
  } catch (error) {
    console.error("❌ Failed to seed songs:", error);
  } finally {
    await client.close();
  }
}

seedSongs();
