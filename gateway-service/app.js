import express from "express";
import dotenv from "dotenv";
import nlpRoutes from "./src/routes/nlp.route.js";
import ingestionRoutes from "./src/routes/ingestion.route.js";
import notificationRoutes from "./src/routes/notification.route.js";
import reportingRoutes from "./src/routes/reporting.route.js";
import healthRoutes from "./src/routes/health.route.js";
import analyticsRoutes from "./src/routes/analytics.route.js";
import adminRoutes from "./src/routes/admin.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Routes to test the gateway service
app.use(express.json());
app.use("/api/v1", nlpRoutes);
app.use("/api/v1", ingestionRoutes);
app.use("/api/v1", notificationRoutes);
app.use("/api/v1", reportingRoutes);
app.use("/api/v1", healthRoutes);
app.use("/api/v1", analyticsRoutes);
app.use("/api/v1", adminRoutes);

app.listen(PORT, () => {
  console.log(`Gateway service is running on port ${PORT}`);
});
