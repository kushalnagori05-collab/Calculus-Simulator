# Calculus Simulator

Calculus Simulator is a clean and interactive web app that helps students solve Integration and Differentiation problems step-by-step. It includes graph visualization, beginner-friendly UI, and fast calculations to make learning calculus easier and more practical.

A modern, professional educational web application built for students who want to learn calculus visually.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 + Tailwind CSS |
| Backend | Express.js + Node.js |
| Database | MongoDB + Mongoose |
| Math Engine | Nerdamer (symbolic CAS) |
| Graphs | Recharts |

## Project Structure

```
calculus-simulator/
├── frontend/          # Next.js app (App Router)
│   └── src/
│       ├── app/       # Pages: /, /integration, /differentiation, /about
│       └── components # Reusable React components
├── backend/           # Express.js REST API
│   ├── config/        # MongoDB connection
│   ├── controllers/   # Route handlers
│   ├── middleware/    # Validation, error handling
│   ├── models/        # Mongoose schemas
│   ├── routes/        # Express routers
│   └── utils/         # Math engine (Nerdamer wrapper)
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** (local or [Atlas](https://www.mongodb.com/atlas) — optional, the app works without it)

### 1. Clone the repository

```bash
git clone https://github.com/kushalnagori05-collab/Calculus-Simulator.git
cd calculus-simulator
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure environment variables

**Backend** — create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/calculus-simulator
NODE_ENV=development
```

**Frontend** — create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Start the servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/integrate` | Compute integral (indefinite or definite) |
| `POST` | `/api/differentiate` | Compute derivative (1st–5th order) |
| `GET` | `/api/history` | Get recent 20 calculations |
| `GET` | `/api/health` | Server health check |

### POST /api/integrate

```json
{
  "expression": "x^2",
  "variable": "x",
  "mode": "definite",
  "lower": "0",
  "upper": "1"
}
```

### POST /api/differentiate

```json
{
  "expression": "x^3 + sin(x)",
  "variable": "x",
  "order": 2
}
```

## Deployment

### Frontend → Vercel

1. Push code to GitHub.
2. Import the `frontend` directory in [Vercel](https://vercel.com).
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`

### Backend → Render

1. Create a new Web Service on [Render](https://render.com).
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Set env vars: `PORT`, `MONGO_URI`, `NODE_ENV=production`

## License

MIT
