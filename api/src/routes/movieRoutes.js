const express = require("express");
const {
  getMovies,
  syncMovies,
  patchMovie,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/", getMovies);
router.post("/sync", syncMovies);
router.patch("/:id", patchMovie);

module.exports = router;
