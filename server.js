const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Routes
const ticketRoutes = require("./routes/tickets");
app.use("/tickets", ticketRoutes);

const { startSLAMonitor } = require("./services/slaMonitor");
startSLAMonitor();

//API Root
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "IT Workflow System API",
    message: "Backend is running successfully"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

