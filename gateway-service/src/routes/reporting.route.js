import express from "express";

const router = express.Router();

router.get("/reporting", (req, res) => {
  res.status(200).json({ message: "Reporting route is working!" });
});

export default router;
