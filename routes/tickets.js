const express = require("express");
const User = require("../models/User");
const router = express.Router();
const Ticket = require("../models/Ticket");
const { applyTicketBusinessRules } = require("../rules/ticketRules");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");


/**
 * POST /tickets
 * Create a new ticket
 */
router.post(
  "/",
  authMiddleware,
  authorizeRoles("Admin", "Agent", "User"),
  async (req, res) => {
  try {
    let ticket = new Ticket(req.body);

    // Applying business rules before saving
    ticket = applyTicketBusinessRules(ticket);

    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



/**
 * GET /tickets
 * Get all tickets
 */
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /tickets/:id
 * Update ticket status
 */
const { triggerCICDPipeline } = require("../services/cicdTrigger");

router.put(
  "/:id/assign",
  authMiddleware,
  authorizeRoles("Admin"),
  async (req, res) => {
    try {
      const { agentId, team } = req.body;

      // Find ticket
      const ticket = await Ticket.findById(req.params.id);

      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }

      // Validate agent
      const agent = await User.findById(agentId);

      if (!agent) {
        return res.status(404).json({ error: "Agent not found" });
      }

      // Update assignment
      ticket.assignedTo = agentId;
      ticket.assignedTeam = team;
      ticket.assignmentStatus = "Assigned";
      ticket.status = "In Progress";

      await ticket.save();

      res.json({
        message: "Ticket assigned successfully",
        ticket
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);


module.exports = router;
