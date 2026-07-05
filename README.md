# 🚀 AI-Driven Enterprise Automation SaaS Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg?style=for-the-badge)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/typescript-5.3-blue.svg?style=for-the-badge)](https://www.typescriptlang.org)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A modern, high-performance, full-stack B2B SaaS application featuring automated content generation powered by **OpenAI (GPT-4)** and **Google Gemini Pro**. Equipped with a credits system, secure recurring Stripe subscriptions, robust JWT-based authentication, rate-limiting, and premium frontend animations.

---

## 🔍 Features & Architecture

### 🧠 Advanced AI Generation Engine
- **Multi-Model Support**: Direct integration with **OpenAI (GPT-4)** and **Google Gemini Pro** APIs.
- **Dynamic Content Templates**: Over 6 pre-configured prompt templates tailored for business needs (e.g., SEO Blogs, Social Media Copy, Email Marketing Campaigns).
- **Pro Templates**: Premium templates restricted to active subscription plans.

### 🪙 Token Credit System
- **Daily Grant**: Free tier users receive **10 free tokens** automatically every day.
- **Consumption Matrix**: Tokens are deducted per query depending on the complexity of the selected AI model and template.
- **Purchase & Topups**: Built-in logic to allow credit expansions via Stripe payments.

### 💳 Stripe Subscription Integration
- **Tiered Subscriptions**: 3 pricing tiers available (Starter, Pro, Enterprise) configured via Stripe plans.
- **Stripe Webhooks**: Asynchronous subscription lifecycle syncing (activation, renewals, cancellations) mapped securely using Stripe Webhooks.
- **Customer Portal**: Self-serve billing portal for subscription upgrades/downgrades/cancellations.

### 🛡️ Enterprise-Grade Security
- **Authentication & Sessions**: Dual JWT approach (access + refresh tokens) coupled with secure password hashing via `bcrypt`.
- **API Guardrails**: Strict endpoint protection utilizing NestJS interceptors, guards, and validators.
- **Rate Limiting**: Throttler protection against brute-force attempts and AI model endpoint abuse.

---

## 🛠️ Technology Stack

### Backend Services
- **Framework**: [NestJS](https://nestjs.com/) (TypeScript-first Node.js framework)
- **Database ORM**: MongoDB using Mongoose ODM
- **AI SDKs**: Official `@google/generative-ai` & `openai` clients
- **Payments**: Stripe Node.js SDK
- **Security**: Passport.js (JWT Strategy), bcrypt, and NestJS Throttler

### Frontend Application
- **Framework**: React 18 + Vite (TypeScript/JavaScript SPA)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion for premium micro-interactions and transitions
- **Routing**: React Router DOM (v6)
- **State & Network**: Axios with interceptors for automatic JWT header attachments

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **MongoDB**: Local community edition or MongoDB Atlas URI
- **Stripe CLI**: Recommended for local webhook development

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-saas-platform.git
cd ai-saas-platform
```

### 2. Configure Backend Service
Navigate to the `backend` folder, install dependencies, and set up your environment variables:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory using the template below:
```env
# Server Configuration
PORT=4000
FRONTEND_URL=http://localhost:5173

# Database Connection
MONGODB_URI=mongodb://localhost:27017/ai-saas

# JSON Web Token Secret
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# AI Provider API Keys
OPENAI_API_KEY=sk-your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key

# Stripe Payment Configs
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

### 3. Configure Frontend Application
Navigate to the `frontend` directory and install dependencies:
```bash
cd ../frontend
npm install
```

### 4. Run the Platform Locally
Open two terminal windows to start both services concurrently:

**Start Backend API Server (Terminal 1)**
```bash
cd backend
npm run start:dev
```
*API will run at:* `http://localhost:4000`

**Start React Frontend (Terminal 2)**
```bash
cd frontend
npm run dev
```
*Webapp will run at:* `http://localhost:5173`

---

## 📁 Directory Structure

```
ai-saas-platform/
├── backend/
│   ├── src/
│   │   ├── main.ts                    # NestJS Entry Point
│   │   ├── app.module.ts              # Root Module
│   │   └── modules/
│   │       ├── auth/                  # Authentication Module (JWT, Passport)
│   │       ├── users/                 # User Accounts & Profiles
│   │       ├── ai/                    # AI Integration (OpenAI & Gemini)
│   │       ├── token/                 # Token Credits Ledger
│   │       └── subscription/          # Stripe Billing & Webhook Endpoints
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                   # React Entry Point
│   │   ├── App.jsx                    # Root App Component
│   │   ├── index.css                  # Global Tailwind Styles
│   │   ├── pages/                     # Routed View Components
│   │   │   ├── Landing.jsx            # Dynamic Landing Page
│   │   │   ├── Pricing.jsx            # Subscription Plans
│   │   │   ├── Dashboard.jsx          # Interactive AI Playground
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── components/                # Reusable UI Components
│   │   │   ├── Layout.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/                   # Context Stores (Auth, Alerts)
│   │   │   ├── AuthContext.jsx
│   │   │   └── ToastContext.jsx
│   │   └── lib/
│   │       └── api.js                 # Axios Base Configurations
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints Reference

### Authentication
| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/api/auth/register` | Register a new user account |
| `POST` | `/api/auth/login` | Log in and receive JWT token |

### Users
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/users/me` | Fetch authenticated user profile details |
| `GET` | `/api/users/stats` | Retrieve user interaction and token statistics |

### AI Generation
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/ai/templates` | Retrieve list of all available templates |
| `POST` | `/api/ai/generate` | Generate text utilizing OpenAI or Gemini Pro |
| `GET` | `/api/ai/generations` | Get past generation logs for the current user |

### Token Operations
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/token/balance` | Query current user token credit balance |

### Stripe Subscription & Billing
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/subscription/plans` | Fetch active pricing & subscription plans |
| `POST` | `/api/subscription/checkout` | Initiate Stripe Checkout session |
| `POST` | `/api/subscription/cancel` | Cancel an active subscription plan |

---

## 💳 Pricing & Subscriptions Matrix

| Plan Tier | Price | Tokens / Month | Core Features |
|:---|:---:|:---:|:---|
| **Free** | $0 | 10 / Daily | Access to Basic Templates |
| **Starter** | $29 / mo | 100 | Priority Customer Support |
| **Pro** | $79 / mo | 500 | API Access, Usage Analytics |
| **Enterprise** | $199 / mo | 2,000 | Dedicated Templates, Team Access |

---

## 📝 Available Prompt Templates

| Template Name | Domain | Token Cost | Tier Requirement |
|:---|:---|:---:|:---|
| SEO Blog Post | Content | 500 | Free |
| Social Media Copy | Marketing | 300 | Free |
| Email Marketing | Marketing | 400 | Free |
| Product Description | E-commerce | 350 | **PRO** |
| Video Script | Video Production | 600 | **PRO** |
| Data Analysis | Analytics | 800 | **PRO** |

---

## 🔒 Crucial Development Notes

1. **API Key Safety**: Never check `.env` into git. Make sure `.gitignore` is correctly initialized in both frontend and backend directories.
2. **Local Webhook Testing**: To receive Stripe subscription lifecycle updates locally, run the Stripe CLI forwarder:
   ```bash
   stripe listen --forward-to localhost:4000/api/subscription/webhook
   ```
3. **JWT Configuration**: Always configure a strong, random key for `JWT_SECRET` in a production environment.

---

## 🧪 Testing & Production Build

### Automated Quality Checks
```bash
# Run unit and integration tests (Backend)
cd backend
npm run test
```

### Production Bundling
```bash
# Production build for Backend NestJS application
cd backend
npm run build
npm run start:prod

# Production static build for Frontend React application
cd ../frontend
npm run build
```

---

## 🤝 Contribution Guidelines

1. **Fork** the project repository.
2. Create a clean feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes: `git commit -m 'feat: Add some amazing feature'`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a **Pull Request** detailing your changes.

---

## 📄 License

This software is distributed under the terms of the MIT License. For more info, please view the [LICENSE](LICENSE) file.

---

<div align="center">
  <p>⭐ If you find this platform helpful, please give the repository a star!</p>
  <p>Created with ❤️ by Antigravity</p>
</div>
