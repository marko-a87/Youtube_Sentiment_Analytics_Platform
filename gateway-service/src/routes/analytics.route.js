import express from "express";

const router = express.Router();

router.get("/api/v1/analytics", (req, res) => {
  res.status(200).json({ message: "Analytics route is working!" });
});

export default router;
