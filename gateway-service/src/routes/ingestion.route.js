import express from "express";

const router = express.Router();

router.get("/ingestion", (req, res) => {
  res.status(200).json({ message: "Ingestion route is working!" });
});

export default router;
