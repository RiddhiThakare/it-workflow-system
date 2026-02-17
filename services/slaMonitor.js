const cron = require("node-cron");
const Ticket = require("../models/Ticket");

function startSLAMonitor() {

  // Runs every 1 minute
  cron.schedule("* * * * *", async () => {

    console.log("⏱️ Running SLA Monitor...");

    const now = new Date();

    // Find breached tickets
    const breachedTickets = await Ticket.find({
      status: { $ne: "Resolved" },
      slaDeadline: { $lt: now },
      escalated: false
    });

    for (const ticket of breachedTickets) {

      ticket.escalated = true;
      ticket.priority = "High";

      await ticket.save();

      console.log(`SLA Breach Escalated: ${ticket._id}`);
    }

  });
}

module.exports = { startSLAMonitor };
