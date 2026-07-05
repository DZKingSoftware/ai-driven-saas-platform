
# 🚀 AI SaaS Platform

> AI-Driven Enterprise Automation Platform - OpenAI (GPT-4) va Google Gemini Pro orqali bizneslar uchun kontent yaratish, ma'lumotlarni tahlil qilish va oylik obuna asosida ishlaydigan SaaS tizim.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.3-blue.svg)

## ✨ Xususiyatlar

### AI Kontent Yaratish
- **GPT-4** va **Gemini Pro** modellarini qo'llab-quvvatlaydi
- 6+ tayyor shablon (SEO Blog, Social Media, Email Marketing, va boshqalar)
- PRO foydalanuvchilar uchun maxsus shablonlar

### Token Credit Tizimi
- Kunlik **10 ta bepul token**
- Har bir generatsiya uchun token sarflanadi
- PRO obunachilar uchun ko'proq token

### To'lov Tizimi
- **Stripe** integratsiyasi
- 3 ta tarif reja: Starter, Pro, Enterprise
- Avtomatik webhook orqali status yangilash

### Xavfsizlik
- JWT autentifikatsiya
- Rate Limiting (ThrottlerModule)
- Parol hashlash (bcrypt)

## 🛠️ Texnologiyalar

### Backend
<div align="center">

| Texnologiya | Maqsad |
|-------------|--------|
| Nest.js | Backend framework |
| MongoDB + Mongoose | Database |
| OpenAI SDK | GPT-4 integratsiya |
| @google/generative-ai | Gemini Pro integratsiya |
| Stripe SDK | To'lov tizimi |
| JWT + bcrypt | Autentifikatsiya |

</div>

### Frontend
<div align="center">

| Texnologiya | Maqsad |
|-------------|--------|
| React 18 + Vite | UI framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router | Routing |
| Axios | HTTP client |

</div>

## 📦 O'rnatish

### Talablar
- Node.js >= 18.0.0
- MongoDB (local yoki Atlas)
- npm yoki yarn

### Clone qilish

```bash
git clone https://github.com/yourusername/ai-saas-platform.git
cd ai-saas-platform
```

### Backend sozlanishi

```bash
cd backend
npm install
```

`.env` faylini yarating:

```env
# Server
PORT=4000
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/ai-saas

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# AI Providers
OPENAI_API_KEY=sk-your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key

# Stripe
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

### Frontend sozlanishi

```bash
cd frontend
npm install
```

### Ishga tushirish

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Brauzerda: [http://localhost:5173](http://localhost:5173)

## 📁 Loyiha Tuzilishi

```
ai-saas-platform/
├── backend/
│   ├── src/
│   │   ├── main.ts                    # Nest.js entry point
│   │   ├── app.module.ts              # Main module
│   │   └── modules/
│   │       ├── auth/                  # Autentifikatsiya
│   │       │   ├── auth.module.ts
│   │       │   ├── auth.service.ts
│   │       │   ├── auth.controller.ts
│   │       │   ├── dto/
│   │       │   ├── strategies/
│   │       │   └── guards/
│   │       ├── users/                 # Foydalanuvchilar
│   │       ├── ai/                    # AI generatsiya
│   │       ├── token/                 # Token tizimi
│   │       └── subscription/          # Stripe to'lov
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                   # React entry point
│   │   ├── App.jsx                    # Main component
│   │   ├── index.css                  # Tailwind styles
│   │   ├── pages/
│   │   │   ├── Landing.jsx            # Bosh sahifa
│   │   │   ├── Pricing.jsx            # Narxlar sahifasi
│   │   │   ├── Dashboard.jsx          # AI Playground
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ToastContext.jsx
│   │   └── lib/
│   │       └── api.js
│   └── package.json
│
└── README.md
```

## 🔌 API Endpointlar

### Auth
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| POST | `/api/auth/register` | Ro'yxatdan o'tish |
| POST | `/api/auth/login` | Kirish |

### Users
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/users/me` | Profil ma'lumotlari |
| GET | `/api/users/stats` | Statistika |

### AI
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/ai/templates` | Shablonlar ro'yxati |
| POST | `/api/ai/generate` | Kontent yaratish |
| GET | `/api/ai/generations` | Tarix |

### Token
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/token/balance` | Balansni ko'rish |

### Subscription
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/subscription/plans` | Tarif rejalar |
| POST | `/api/subscription/checkout` | To'lov sahifasi |
| POST | `/api/subscription/cancel` | Bekor qilish |

## 💳 Narxlar

| Plan | Narx | Token | Xususiyatlar |
|------|------|-------|--------------|
| **Free** | $0 | 10/kun | Basic shablonlar |
| **Starter** | $29/oy | 100/oy | + Priority support |
| **Pro** | $79/oy | 500/oy | + API access, Analytics |
| **Enterprise** | $199/oy | 2000/oy | + Custom templates, Team |

## 📝 Shablonlar

| Shablon | Kategoriya | Token | Daraja |
|---------|------------|-------|--------|
| SEO Blog Post | Content | 500 | Free |
| Social Media | Marketing | 300 | Free |
| Email Marketing | Marketing | 400 | Free |
| Product Description | E-commerce | 350 | **PRO** |
| Video Script | Video | 600 | **PRO** |
| Data Analysis | Analytics | 800 | **PRO** |

## 🔒 Muhim Eslatmalar

1. **API Kalitlar** - `OPENAI_API_KEY` va `GEMINI_API_KEY` ni `.env` faylida saqlang
2. **Stripe Webhook** - Local test uchun Stripe CLI ishlatish tavsiya etiladi:
   ```bash
   stripe listen --forward-to localhost:4000/api/subscription/webhook
   ```
3. **JWT Secret** - Production uchun kuchli secret ishlatilsin

## 🧪 Test qilish

```bash
# Backend test
cd backend
npm run test

# Frontend build
cd frontend
npm run build
```

## 📈 Production Deploy

### Environment o'zgartirish

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=production-secret
```

### Build

```bash
# Backend
cd backend
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
```

## 🤝 Qo'shish

1. Fork qiling
2. Branch yarating (`git checkout -b feature/amazing`)
3. Commit qiling (`git commit -m 'Add amazing feature'`)
4. Push qiling (`git push origin feature/amazing`)
5. Pull Request oching

## 📄 License

MIT License - batafsil [LICENSE](LICENSE) faylini ko'ring.

## 👨‍💻 Author

**AI SaaS Platform**
- Website: https://ai-saas-platform.com
- Email: support@ai-saas-platform.com

---

<div align="center">
  <p>⭐ Agar foydali bo'lsa, yulduz qo'yishni unutmang!</p>
  <p>Made with ❤️ and AI</p>
</div>
