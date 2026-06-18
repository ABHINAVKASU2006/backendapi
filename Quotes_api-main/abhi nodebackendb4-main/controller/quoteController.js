const Quote = require("../models/Quote");
const seedQuotes = require("../config/quotes");

// POST /api/v1/quotes
exports.addQuote = async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json({ message: "Quote added", quote });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/v1/quotes  (supports ?tag=motivation&length=short)
exports.getAllQuotes = async (req, res) => {
  try {
    const filter = {};
    if (req.query.tag) filter.tags = req.query.tag;
    if (req.query.length) filter.length = req.query.length;

    const quotes = await Quote.find(filter);
    res.status(200).json({ message: "All quotes", count: quotes.length, quotes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/v1/quotes/:id
exports.getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });
    res.status(200).json({ message: "Quote details", quote });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/v1/quotes/random
exports.getRandomQuote = async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    if (count === 0) return res.status(404).json({ message: "No quotes found" });
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random);
    res.status(200).json({ message: "Random quote", quote });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/v1/quotes/:id
exports.updateQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quote) return res.status(404).json({ message: "Quote not found" });
    res.status(200).json({ message: "Quote updated", quote });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/v1/quotes/:id
exports.deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });
    res.status(200).json({ message: "Quote deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/v1/quotes/seed  — seed DB from config/quotes.js
exports.seedQuotes = async (req, res) => {
  try {
    await Quote.deleteMany();
    const inserted = await Quote.insertMany(seedQuotes);
    res.status(201).json({ message: "DB seeded", count: inserted.length, quotes: inserted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
