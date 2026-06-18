const express = require("express");
const router = express.Router();
const {
  addQuote,
  getAllQuotes,
  getQuoteById,
  getRandomQuote,
  updateQuote,
  deleteQuote,
  seedQuotes,
} = require("../controller/quoteController");

// Seed route — must be before /:id to avoid conflict
router.post("/seed", seedQuotes);
router.get("/random", getRandomQuote);

router.post("/", addQuote);
router.get("/", getAllQuotes);
router.get("/:id", getQuoteById);
router.put("/:id", updateQuote);
router.delete("/:id", deleteQuote);

module.exports = router;
