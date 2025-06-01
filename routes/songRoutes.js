const express = require("express");
const {
  getSongs,
  addSong,
  searchSongsByName,
  getSongById,
} = require("../controllers/songsController");

const router = express.Router();

router.get("/", getSongs);
router.get("/searchByName", searchSongsByName);
router.get("/getById", getSongById);
router.post("/", addSong);

module.exports = router;
