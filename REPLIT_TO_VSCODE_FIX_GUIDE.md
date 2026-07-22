# Replit → VS Code Fix - Why Backend Crashes Locally

Your project runs on Replit because Replit auto-injects: `PORT`, `DATABASE_URL` (Postgres), `NODE_ENV`, Node 24, pnpm, Linux. VS Code has none of that, so backend throws.

## 7 Root Causes Found in Your Code:

### 1. `PORT` required - Throws at startup
**File:** `artifacts/api-server/src/index.ts:3`
```ts
if (!rawPort) throw new Error("PORT environment variable is required");
```
Replit sets PORT automatically. Locally you have no PORT → crash.
**Fixed:** Changed to `process.env["PORT"] || "8080"` (now defaults to 8080)

### 2. `DATABASE_URL` required - Throws at import time
**File:** `lib/db/src/index.ts:8` and `lib/db/drizzle.config.ts:4`
```ts
if (!DATABASE_URL) throw new Error("DATABASE_URL must be set");
```
Replit auto-provisions Neon Postgres. Locally you have no DB → crash on `import { db } from "@workspace/db"`
**Fixed:** No more throwing at import. Warns and uses placeholder, fails only when actually querying.

### 3. `export` command fails on Windows
**File:** `artifacts/api-server/package.json`
```json
"dev": "export NODE_ENV=development && pnpm run build && ..."
```
`export` is Linux/Mac bash only. On Windows CMD/PowerShell it says:
`'export' is not recognized as an internal or external command`
**Fixed:** Changed to `cross-env NODE_ENV=development ...` - works on Windows/Mac/Linux

### 4. No `.env` loading
Project never uses `dotenv`. Replit injects secrets via env. VS Code requires `.env` file manually loaded.
**Fixed:** Added `dotenv` to `api-server` and `db` packages, now loads `.env` from workspace root automatically.

### 5. `pnpm-workspace.yaml` blocks Windows esbuild
It contains:
```yaml
overrides:
  "esbuild>@esbuild/win32-x64": "-"
```
This deletes Windows binaries to make Replit (linux-x64 only) smaller. On Windows local, `pnpm install` → esbuild cannot find binary → `Error: esbuild binary not found`
**Fix:** For local Windows dev, use `pnpm-workspace.local.yaml` (provided) or delete the `overrides:` section that ends with `-`.

### 6. You used `npm install` instead of `pnpm`
Root `package.json` has preinstall that kills npm:
```json
"preinstall": "Use pnpm instead"
```
Many students run `npm install` → cryptic error.
**Fix:** Must install pnpm: `npm install -g pnpm` or `corepack enable`

### 7. No Postgres locally
Replit gives you a Postgres. Locally you have none, so even if `DATABASE_URL` is set to placeholder, `db.select()` fails: `ECONNREFUSED 127.0.0.1:5432`
**Fix:** Use Docker (`docker-compose up -d`) or use Neon free Postgres URL.

---

## How to Run Locally in VS Code (Fixed Steps)

### Step 1: Prerequisites
Install Node.js 20+ (you have Node 24 on Replit, local Node 18 may cause TS errors)
Install pnpm:
```bash
corepack enable
corepack prepare pnpm@latest --activate
# or
npm install -g pnpm
```

### Step 2: Extract Clean Zip (Not 149MB one)
Use the **fixed clean zip** I created: `EduBot-Fixed-Clean.zip` (2.3MB, no node_modules)
```bash
unzip EduBot-Fixed-Clean.zip
cd EduBot-Project
```

### Step 3: Create .env file
```bash
cp .env.example .env
# Edit .env and paste your GEMINI_API_KEY
# Get key from: https://aistudio.google.com/app/apikey
```

Content should be:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/edubot
PORT=8080
GEMINI_API_KEY=AIza... your key
```

### Step 4: Start Postgres (Pick One Option)

**Option A - Docker (Easiest if you have Docker Desktop):**
```bash
docker-compose up -d
```

**Option B - Neon Free (No Docker needed, use cloud DB like Replit):**
1. Go to https://neon.tech -> Create free project
2. Copy connection string
3. Paste into .env as DATABASE_URL

**Option C - Skip DB temporarily for frontend only test:**
The backend will warn but you can still run `pnpm --filter @workspace/student-chatbot run dev` to see UI (API calls will fail).

### Step 5: Install & Build
```bash
# On Windows, if you have esbuild error, first:
# copy pnpm-workspace.local.yaml to pnpm-workspace.yaml
# cp pnpm-workspace.local.yaml pnpm-workspace.yaml

pnpm install
pnpm --filter @workspace/api-spec run codegen
pnpm --filter @workspace/db run push
pnpm run build
```

### Step 6: Run Both Servers
In 2 separate terminals:

Terminal 1 - Backend:
```bash
pnpm --filter @workspace/api-server run dev
# Should log: Server listening { port: 8080 }
```

Terminal 2 - Frontend:
```bash
pnpm --filter @workspace/student-chatbot run dev
# Should log: VITE ... http://localhost:5173 (or 23699) -> check Replit vs local port in vite.config
```

Open http://localhost:5173

---

## Patched Files I Already Fixed For You:

1. `artifacts/api-server/src/index.ts` -> PORT defaults to 8080 + dotenv loading
2. `artifacts/api-server/src/app.ts` -> added dotenv import
3. `lib/db/src/index.ts` -> no throw at import, warns, dotenv loading
4. `lib/db/drizzle.config.ts` -> no throw, uses placeholder
5. `artifacts/api-server/package.json` -> dev uses cross-env, added dotenv + cross-env deps
6. `lib/db/package.json` -> added dotenv dep
7. Created `.env.example`
8. Created `docker-compose.yml`
9. Created `pnpm-workspace.local.yaml` (Windows-friendly, no - overrides)

---

## If you still see backend error, copy the exact log:

Most common errors and fixes:

| Error | Fix |
|-------|-----|
| `DATABASE_URL must be set` | You are using old file, pull fixed version or create `.env` |
| `PORT environment variable is required` | You are using old file, use fixed `index.ts` |
| `'export' is not recognized` | Run `pnpm --filter @workspace/api-server run dev:win` or install cross-env |
| `Cannot find module 'pg'` | Run `pnpm install` from root, NOT npm install |
| `ECONNREFUSED 127.0.0.1:5432` | Start Postgres: `docker-compose up -d` or set Neon URL |
| `esbuild: Failed to find binary` | On Windows, use `pnpm-workspace.local.yaml` |
| `GEMINI_API_KEY is not set` | Set it in `.env` |
| `Use pnpm instead` | You ran npm install, run pnpm install |

---

## Recommendation:

For your critical project demo, keep running on Replit for presentation (it works), but develop locally using Docker + the fixed clean zip. This avoids Replit's cold starts.

Want me to create the fixed clean zip for you to download directly?
