import express from "express";

const router = express.Router();

router.get("/api/v1/nlp", (req, res) => {
  res.status(200).json({ message: "NLP route is working!" });
});

export default router;
