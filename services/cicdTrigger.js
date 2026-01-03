function triggerCICDPipeline(ticket) {
  console.log("🚀 CI/CD Pipeline Triggered");
  console.log("Ticket ID:", ticket._id.toString());
  console.log("Reason: Ticket moved to In Progress");
}

module.exports = { triggerCICDPipeline };
