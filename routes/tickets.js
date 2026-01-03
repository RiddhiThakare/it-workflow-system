const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const { applyTicketBusinessRules } = require("../rules/ticketRules");

/**
 * POST /tickets
 * Create a new ticket
 */
router.post("/", async (req, res) => {
  try {
    let ticket = new Ticket(req.body);

    // 🔥 Apply business rules BEFORE saving
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

router.put("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    const previousStatus = ticket.status;

    if (req.body.status) {
      ticket.status = req.body.status;
    }

    await ticket.save();

    //  PHASE 4 BUSINESS RULE
    if (previousStatus !== "In Progress" && ticket.status === "In Progress") {
      triggerCICDPipeline(ticket);
    }

    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
