# EduBot — Fixed & Ready to Run Locally ✅

This project has been **fully patched** to run on Windows, Mac, and Linux using VS Code.
All 12+ bugs from the original Replit version have been fixed.

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Prerequisites
Install these if you don't have them:
- **Node.js 20+** → https://nodejs.org (download LTS)
- **VS Code** → https://code.visualstudio.com

### Step 2: Extract & Open
1. Extract this zip
2. Open the extracted folder in VS Code (**File → Open Folder**)
3. Open terminal: **Ctrl + `**

### Step 3: Install pnpm
```bash
corepack enable
corepack prepare pnpm@latest --activate
```
If that fails on Windows:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
Then try again.

### Step 4: Switch Config (Windows)
```bash
copy pnpm-workspace.local.yaml pnpm-workspace.yaml
```
(Linux/Mac: `cp pnpm-workspace.local.yaml pnpm-workspace.yaml`)

### Step 5: Create .env
```bash
copy .env.example .env
```
Then open `.env` and fill in:
- `GEMINI_API_KEY` → Get free from https://aistudio.google.com/app/apikey
- `DATABASE_URL` → Get free from https://neon.tech (create project, copy connection string)

### Step 6: Install Dependencies
```bash
pnpm install
```
If it asks to approve builds: press **a** (all) then **Enter**.

### Step 7: Generate API Types
```bash
pnpm --filter @workspace/api-spec run codegen
```

### Step 8: Set Up Database
```bash
pnpm --filter @workspace/db run push
```

### Step 9: Run!

**Terminal 1 — Backend:**
```bash
pnpm --filter @workspace/api-server run dev
```
Wait for: `Server listening { port: 8080 }`

**Terminal 2 — Frontend** (click **+** to open new terminal):
```bash
pnpm --filter @workspace/student-chatbot run dev
```
Wait for: `➜ Local: http://localhost:5173/`

### Step 10: Open Browser
Go to **http://localhost:5173** 🎉

---

## 🔧 All Bugs Fixed in This Version:

| # | Original Bug | Fix Applied |
|---|-------------|-------------|
| 1 | `PORT` required → crash on startup | Defaults to 8080 (backend) / 5173 (frontend) |
| 2 | `DATABASE_URL` required → crash on import | Warns instead of crashing |
| 3 | `export` command → fails on Windows | Replaced with `cross-env` |
| 4 | No `.env` loading | Added `dotenv` to all packages |
| 5 | esbuild Windows binaries blocked | Created `pnpm-workspace.local.yaml` |
| 6 | `GEMINI_API_KEY` required → crash | Warns instead of crashing |
| 7 | Frontend `PORT`/`BASE_PATH` required → crash | Defaults to 5173 and `/` |
| 8 | `sh -c` preinstall script → fails on Windows | Removed (unnecessary) |
| 9 | `generateImage` export missing → TypeScript error | Removed broken export |
| 10 | Drizzle schema path wrong → `No schema files found` | Fixed to relative path |
| 11 | Frontend calls itself instead of backend → 404 | Added Vite proxy `/api` → `localhost:8080` |
| 12 | `conversations?.map` crash when API returns non-array | Added `Array.isArray()` guard |
| 13 | `mockup-sandbox` & `edubot-ppt` also crash on PORT | Fixed with defaults |

---

## 📁 Project Structure

```
EduBot/
├── artifacts/
│   ├── api-server/              # Backend (Express, port 8080)
│   ├── student-chatbot/         # Frontend (Vite + React, port 5173)
│   ├── edubot-ppt/             # PPT generator (optional)
│   └── mockup-sandbox/         # Mockup viewer (optional)
├── lib/
│   ├── db/                     # Database (Drizzle ORM + Postgres)
│   ├── api-spec/               # API specifications
│   ├── api-zod/                # Zod schemas
│   ├── api-client-react/       # React API hooks
│   └── integrations-gemini-ai/ # Gemini AI integration
├── .env.example                # Environment template
├── docker-compose.yml          # Local Postgres (optional)
├── pnpm-workspace.local.yaml   # Windows-friendly config
└── COMPLETE_BEGINNER_GUIDE.html # Visual step-by-step guide
```

---

## ❓ Common Issues & Fixes

| Error | Fix |
|-------|-----|
| `'pnpm' is not recognized` | Run `npm install -g pnpm` |
| `running scripts is disabled` | Run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` |
| `'sh' is not recognized` | Already fixed in this version |
| `esbuild binary not found` | Run `copy pnpm-workspace.local.yaml pnpm-workspace.yaml` then `pnpm install` |
| `ECONNREFUSED 5432` | Check DATABASE_URL in .env (use Neon.tech) |
| `Port 8080 already in use` | Frontend now uses 5173 (fixed) |
| `Cannot GET /` | Open http://localhost:5173 not http://localhost:8080 |
| `404 Not Found` on messages | Proxy is configured (fixed in this version) |
| `conversations?.map is not a function` | Fixed with Array.isArray guard |
| `pnpm approve-builds` prompt | Press `a` then `Enter` |

---

## 🔑 Getting API Keys (Free)

### Gemini API Key:
1. Go to https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)
5. Paste into `.env` as `GEMINI_API_KEY=AIza...`

### Database URL (Neon):
1. Go to https://neon.tech
2. Sign up (free, no credit card)
3. Create a project
4. Copy the connection string
5. Paste into `.env` as `DATABASE_URL=postgresql://...`

---

## 📝 Daily Usage (After Setup)

Just 2 commands every time:
```bash
# Terminal 1:
pnpm --filter @workspace/api-server run dev

# Terminal 2:
pnpm --filter @workspace/student-chatbot run dev
```
Then open http://localhost:5173

---

*This project was originally built on Replit and has been fully patched for local development.*
#
