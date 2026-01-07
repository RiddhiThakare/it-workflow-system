# 🧩 IT Workflow System  
### ServiceNow-Style ITSM Backend with Automation, SLA & CI/CD


## 📘 Overview

**IT Workflow System** is a backend application inspired by **ServiceNow IT Service Management (ITSM)** concepts.  
It simulates how incidents are handled in real engineering teams using **backend automation, SLA enforcement, event-driven workflows, and cloud deployment**.


## 🚀 Features

- **Incident (Ticket) Management**
  - Create, view, and update incidents using REST APIs
- **Backend Business Rules**
  - Automatic status updates based on ticket priority
- **SLA Engine**
  - SLA deadlines assigned to high-priority tickets
  - Automatic escalation on SLA breach
- **Event-Driven Automation**
  - Ticket status changes trigger CI/CD-style workflows
- **External Integration**
  - Webhook notification sent on SLA escalation
- **Cloud Deployment**
  - Deployed on Render with MongoDB Atlas
  - Automatic redeploy on every GitHub push

## 🧱 Tech Stack

- **Backend:** Node.js, Express  
- **Database:** MongoDB Atlas  
- **Automation:** JavaScript (Business Rules, SLA Monitor)  
- **Cloud:** Render  
- **CI/CD:** GitHub → Render Auto Deploy  
- **Integration:** REST Webhooks  


## 📁 Project Structure

```text
it-workflow-system/
├── models/          # Ticket schema (Incident table)
├── routes/          # REST API routes
├── rules/           # Business rules (automation logic)
├── services/        # SLA monitor, CI/CD trigger, webhook service
├── server.js        # Application entry point
├── package.json
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint        | Description               |
|------|-----------------|---------------------------|
| POST | `/tickets`      | Create a new incident     |
| GET  | `/tickets`      | Retrieve all incidents    |
| PUT  | `/tickets/:id`  | Update ticket status      |


## 🔄 Workflow
```
Ticket Created / Updated
↓
Business Rules Applied
↓
SLA Deadline Assigned
↓
SLA Monitor Checks Deadline
↓
Escalation + Webhook Notification
↓
CI/CD-Style Trigger
```

## 🌐 Live Deployment

**Backend URL:**  
👉 https://it-workflow-system.onrender.com



## 🔐 Environment Variables

```env
MONGO_URI=MongoDB Atlas connection string
WEBHOOK_URL=Webhook endpoint for SLA escalation
```

## ▶️ Run Locally
```
npm install
npm start
```

Server runs at:
http://localhost:3000

### 🧠 Key Learnings
Implemented backend automation similar to ServiceNow Business Rules

Designed time-based SLA enforcement with automatic escalation

Built event-driven workflows triggered by ticket state changes

Deployed a production-ready backend using cloud and CI/CD practices

### 📄 License

MIT License

