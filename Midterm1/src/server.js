import express from "express";
import tasksRouter from "./routes/tasks.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.get("/health", (req, res) => {
  return res.json("Healthy!"); // returns healthy message
});

app.use("/api/tasks", tasksRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});