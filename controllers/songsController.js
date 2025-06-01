const { ObjectId } = require("mongodb");
const { getCollections } = require("../config/db");

// Get Song by ID
async function getSongById(req, res) {
  console.log("Fetching song by ID:", req.query.id); // <--- log the ID being fetched
  const { songsCollection } = getCollections();
  const { id } = req.query; // <--- use query here

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid song ID" });
  }

  try {
    const song = await songsCollection.findOne({ _id: new ObjectId(id) });

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(song);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch song" });
  }
}

// Get all songs
async function getSongs(req, res) {
  const { songsCollection } = getCollections();

  try {
    const songs = await songsCollection.find().toArray();
    res.status(200).json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load songs" });
  }
}

// Search songs by name (case-insensitive)
async function searchSongsByName(req, res) {
  const { songsCollection } = getCollections();
  const query = req.query.name;

  if (!query || typeof query !== "string" || !query.trim()) {
    return res.status(400).json({ message: "Missing or invalid search query" });
  }

  try {
    const regex = new RegExp(query, "i");
    const results = await songsCollection
      .find({ name: { $regex: regex } })
      .toArray();

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to search songs" });
  }
}

// Add a new song
async function addSong(req, res) {
  const { songsCollection } = getCollections();
  const { name, artist, imageurl, song } = req.body;

  if (
    !name ||
    typeof name !== "string" ||
    !name.trim() ||
    !artist ||
    typeof artist !== "string" ||
    !artist.trim() ||
    !song ||
    typeof song !== "object" ||
    (Array.isArray(song) && song.length === 0)
  ) {
    return res.status(400).json({
      message:
        "Invalid song data. Required: name (string), artist (string), song (object/array). Optional: imageurl (string).",
    });
  }

  const newSong = {
    name: name.trim(),
    artist: artist.trim(),
    song,
    imageurl: imageurl && typeof imageurl === "string" ? imageurl.trim() : null,
  };

  try {
    const result = await songsCollection.insertOne(newSong);
    res.status(201).json({
      message: "Song added successfully",
      songId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add song" });
  }
}

module.exports = { getSongs, addSong, searchSongsByName, getSongById };
