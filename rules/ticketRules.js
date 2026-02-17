function applyTicketBusinessRules(ticket) {

  const text = (
    (ticket.title || "") +
    " " +
    (ticket.description || "")
  ).toLowerCase();

  // Auto Category Classification
  if (text.includes("server")) {
    ticket.category = "Infrastructure";
    ticket.assignedTeam = "DevOps";
  }

  else if (text.includes("database") || text.includes("db")) {
    ticket.category = "Database";
    ticket.assignedTeam = "DBA";
  }

  else if (text.includes("network") || text.includes("internet")) {
    ticket.category = "Network";
    ticket.assignedTeam = "Infra";
  }

  else if (text.includes("security") || text.includes("breach")) {
    ticket.category = "Security";
    ticket.assignedTeam = "Security";
  }

  else {
    ticket.category = "Software";
    ticket.assignedTeam = "Support";
  }

  //  Priority Escalation Rule
  if (ticket.priority === "High") {
    ticket.status = "In Progress";

    const slaTime = 2 * 60 * 1000; // 2 mins
    ticket.slaDeadline = new Date(Date.now() + slaTime);
  }

  return ticket;
}

module.exports = { applyTicketBusinessRules };
