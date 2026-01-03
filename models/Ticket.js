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
}

});


module.exports = mongoose.model("Ticket", ticketSchema);
