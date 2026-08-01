import express from "express";

const router = express.Router();

router.get("/admin", (req, res) => {
  res.status(200).json({ message: "Admin route is working!" });
});

export default router;
