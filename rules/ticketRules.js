function applyTicketBusinessRules(ticket) {

  // Rule 1: Auto-escalate high priority tickets
  if (ticket.priority === "High") {
    ticket.status = "In Progress";

    // SLA: 2 minutes from creation
    const slaTime = 2 * 60 * 1000;
    ticket.slaDeadline = new Date(Date.now() + slaTime);
  }

  return ticket;
}

module.exports = { applyTicketBusinessRules };
