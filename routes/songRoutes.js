const express = require("express");
const {
  getSongs,
  addSong,
  searchSongsByName,
} = require("../controllers/songsController");

const router = express.Router();

router.get("/", getSongs);
router.get("/searchByName", searchSongsByName);
router.post("/", addSong);

module.exports = router;
