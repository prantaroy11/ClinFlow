# ClinFlow (Cineflow) Backend Architecture

A scalable, decoupled movie ticket booking backend system built with Node.js and MongoDB. This project utilizes a microservices approach to separate core booking logic from asynchronous tasks, ensuring high availability and seamless user experiences. 

The architecture is split into two main components:
1. **Core API (ClinFlow):** Handles user authentication, theater management, movie scheduling, and ticket booking.
2. **Notification Microservice:** A standalone background service that asynchronously processes and delivers booking confirmation emails.

---

## 🏗️ Architecture & Workflow

To prevent the main API from hanging while waiting for third-party email servers, the system uses an asynchronous database-polling architecture:

1. A user successfully books a movie ticket via the **Core API**.
2. The Core API generates an email payload and securely sends an HTTP POST request to the **Notification Service**.
3. The Notification Service saves the email ticket to a dedicated MongoDB database with a status of `PENDING`.
4. A scheduled **Cron Job** (running every 2 minutes) sweeps the database for `PENDING` tickets.
5. The cron job dispatches the emails using the **Resend API**.
6. Upon successful delivery, the ticket status is updated to `SUCCESS`.

---

## ✨ Features

* **Secure Authentication:** JWT-based user login and registration.
* **Movie & Show Management:** Endpoints for managing theaters, movies, and showtimes.
* **Booking Engine:** Transactional ticket booking logic ensuring seat availability.
* **Decoupled Notifications:** Dedicated microservice for offloading heavy network tasks.
* **Resilient Delivery:** Automated cron job retries for pending email notifications.
* **Cloud-Ready:** Fully configured for deployment on modern PaaS platforms (like Render).

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ORM)
* **Authentication:** JSON Web Tokens (JWT)
* **Email Provider:** Resend API
* **Task Scheduling:** `node-cron`
* **Other Tools:** `dotenv`, `body-parser`

---

## 📂 Repositories

This project is divided across two repositories:
* **[ClinFlow (Core API)](https://github.com/prantaroy11/ClinFlow):** The primary backend handling users, movies, and bookings.
* **[NotificationService](https://github.com/prantaroy11/NotificationService):** The email delivery microservice.

---

## 🚀 Installation & Setup

### Prerequisites
* Node.js (v16+)
* MongoDB URI (Atlas or Local)
* Resend API Key (starts with `re_...`)

### 1. Setting up the Notification Service
Clone the notification repository and install dependencies:
```bash
git clone https://github.com/prantaroy11/NotificationService.git
npm install
```

Create a `.env` file in the root directory:
```env
PORT=3001
NODE_ENV=development
DB_URL=mongodb://localhost:27017/noti_db
PROD_DB_URL=your_mongodb_atlas_url
RESEND_API_KEY=re_your_api_key_here
```

Start the notification service:
```bash
npm start
```

### 2. Setting up the Core API (ClinFlow)
Clone the main repository and install dependencies:
```bash
git clone https://github.com/prantaroy11/ClinFlow.git
cd ClinFlow
npm install
```

Create a `.env` file in the root directory:
```env
PORT=3000
DB_URL=mongodb://localhost:27017/mba_db
NOTIFICATION_SERVICE_URL=http://localhost:3001/notiservice/api/v1/notifications
JWT_SECRET=your_jwt_secret_key
```

Start the main server:
```bash
npm start
```

---

## 📡 API Endpoints (Notification Service)

### `POST /notiservice/api/v1/notifications`
Creates a new notification ticket and queues it for delivery.
**Payload:**
```json
{
  "subject": "Your booking is successful!",
  "content": "Your booking for The Monkey King in PVR for 2 seats is confirmed.",
  "recepientEmails": ["user@example.com"]
}
```

### `GET /notiservice/api/v1/notifications`
Fetches all notification tickets (Pending, Success, Failed).

### `GET /notiservice/api/v1/notifications/:id`
Fetches the status of a specific notification ticket.

---

## 👨‍💻 Author
**Pranta Roy** * GitHub: [@prantaroy11](https://github.com/prantaroy11)
