const Ticket = require("../models/Ticket");

function startSLAMonitor() {
  setInterval(async () => {
    const now = new Date();

    const overdueTickets = await Ticket.find({
      priority: "High",
      status: { $ne: "Resolved" },
      slaDeadline: { $lt: now },
      escalated: false
    });

    for (let ticket of overdueTickets) {
      ticket.escalated = true;
      ticket.status = "In Progress";
      await ticket.save();

      console.log(`🚨 SLA breached for ticket: ${ticket._id}`);
    }
  }, 60 * 1000); // check every 1 minute
}

module.exports = { startSLAMonitor };
