const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low"
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved"],
    default: "Open"
  },
  category: {
    type: String,
    enum: ["Software", "Hardware", "Network", "Database", "Infrastructure"],
    default: "Software"
  },
  assignedTeam: {
    type: String,
    enum: ["DevOps", "DBA", "Support", "Infra", "Security"],
    default: "Support"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  assignmentStatus: {
    type: String,
    enum: ["Unassigned", "Assigned"],
    default: "Unassigned"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
 slaDeadline: {
  type: Date
},
escalated: {
  type: Boolean,
  default: false
},
resolvedAt: {
    type: Date
  }

});


module.exports = mongoose.model("Ticket", ticketSchema);
