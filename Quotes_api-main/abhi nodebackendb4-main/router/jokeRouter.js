const express = require("express");
const router = express.Router();
const {
  addJoke,
  getAllJokes,
  getRandomJoke,
  getJokeById,
  updateJoke,
  deleteJoke,
} = require("../controller/jokeController");

// specific routes before /:id
router.get("/random", getRandomJoke);

router.post("/", addJoke);
router.get("/", getAllJokes);
router.get("/:id", getJokeById);
router.put("/:id", updateJoke);
router.delete("/:id", deleteJoke);

module.exports = router;
