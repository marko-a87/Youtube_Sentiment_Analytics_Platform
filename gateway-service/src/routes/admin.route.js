import express from "express";

const router = express.Router();

router.get("/api/admin", (req, res) => {
  res.status(200).json({ message: "Admin route is working!" });
});

export default router;
