const axios = require("axios");

async function sendEscalationWebhook(ticket) {
  try {
    await axios.post(process.env.WEBHOOK_URL, {
      ticketId: ticket._id,
      title: ticket.title,
      priority: ticket.priority,
      status: ticket.status,
      escalatedAt: new Date()
    });
  } catch (err) {
    console.error("Webhook failed:", err.message);
  }
}

module.exports = { sendEscalationWebhook };
