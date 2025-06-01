const { ObjectId } = require("mongodb");
const { getCollections } = require("../config/db");

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

async function searchSongsByName(req, res) {
  const { songsCollection } = getCollections();
  const query = req.query.name;

  try {
    // If query is missing, empty, or 'all', return all songs
    if (!query || query.trim() === "" || query.toLowerCase() === "all") {
      const allSongs = await songsCollection.find().toArray();
      return res.status(200).json(allSongs);
    }

    // Otherwise search by name
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

module.exports = { getSongs, addSong, searchSongsByName };
