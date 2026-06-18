const Joke = require("../models/Joke");

// POST /api/v1/jokes
exports.addJoke = async (req, res) => {
  try {
    const joke = await Joke.create(req.body);
    res.status(201).json({ message: "Joke added", joke });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/v1/jokes  (supports ?tag=funny)
exports.getAllJokes = async (req, res) => {
  try {
    const filter = {};
    if (req.query.tag) filter.tags = req.query.tag;
    if (req.query.author) filter.author = req.query.author;

    const jokes = await Joke.find(filter);
    res.status(200).json({ message: "All jokes", count: jokes.length, jokes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/v1/jokes/random
exports.getRandomJoke = async (req, res) => {
  try {
    const count = await Joke.countDocuments();
    if (count === 0) return res.status(404).json({ message: "No jokes found" });
    const random = Math.floor(Math.random() * count);
    const joke = await Joke.findOne().skip(random);
    res.status(200).json({ message: "Random joke", joke });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/v1/jokes/:id
exports.getJokeById = async (req, res) => {
  try {
    const joke = await Joke.findById(req.params.id);
    if (!joke) return res.status(404).json({ message: "Joke not found" });
    res.status(200).json({ message: "Joke details", joke });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/v1/jokes/:id
exports.updateJoke = async (req, res) => {
  try {
    const joke = await Joke.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!joke) return res.status(404).json({ message: "Joke not found" });
    res.status(200).json({ message: "Joke updated", joke });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/v1/jokes/:id
exports.deleteJoke = async (req, res) => {
  try {
    const joke = await Joke.findByIdAndDelete(req.params.id);
    if (!joke) return res.status(404).json({ message: "Joke not found" });
    res.status(200).json({ message: "Joke deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
