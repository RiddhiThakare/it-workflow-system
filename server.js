const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/it_workflow")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("DB connection error:", err);
  });

// Routes
const ticketRoutes = require("./routes/tickets");
app.use("/tickets", ticketRoutes);

const { startSLAMonitor } = require("./services/slaMonitor");
startSLAMonitor();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

