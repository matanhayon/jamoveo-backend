const { getCollections } = require("../config/db");

async function getInstruments(req, res) {
  const { instrumentsCollection } = getCollections();

  try {
    const instruments = await instrumentsCollection.find().toArray();
    res.status(200).json(instruments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load instruments" });
  }
}

module.exports = { getInstruments };
