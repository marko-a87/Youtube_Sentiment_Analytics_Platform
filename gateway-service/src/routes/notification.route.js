import express from "express";

const router = express.Router();

router.get("/api/v1/notification", (req, res) => {
  res.status(200).json({ message: "Notification route is working!" });
});

export default router;
