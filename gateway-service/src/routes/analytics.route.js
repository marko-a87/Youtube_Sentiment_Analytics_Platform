import express from "express";

const router = express.Router();

router.get("/analytics", (req, res) => {
  res.status(200).json({ message: "Analytics route is working!" });
});

export default router;
