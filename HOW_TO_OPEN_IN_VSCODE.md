# How to Open EduBot in VS Code - Step by Step (Windows)

### You have 2 files from me in this chat workspace:
1. `EduBot-Fixed-Clean.zip` - This is your FIXED project (298KB)
2. `REPLIT_TO_VSCODE_FIX_GUIDE.md` - The detailed fix report

#### Step 1: Download the zip from here (Arena Workspace)

In the left panel of this chat (File Explorer):
- Find `EduBot-Fixed-Clean.zip`
- Right-click → **Download**  (or click the download icon)
- Save to `Downloads` or `Desktop`

#### Step 2: Extract the zip

1. Go to your `Downloads` folder
2. Right-click on `EduBot-Fixed-Clean.zip` → **Extract All...** → **Extract**
3. You will get a folder like `EduBot-Fixed-Clean` or just files directly. 
   **IMPORTANT:** The folder that contains `pnpm-workspace.yaml`, `package.json`, `artifacts` is the ROOT.

#### Step 3: Open that ROOT folder in VS Code

1. Open **VS Code**
2. Click **File → Open Folder...** (or `Ctrl+K Ctrl+O`)
3. Select the extracted folder that contains `pnpm-workspace.yaml`
   - CORRECT: `.../EduBot-Fixed-Clean/artifacts`, `lib`, `package.json`
   - WRONG: Don't open only `artifacts/api-server` - open the root
4. VS Code will ask "Do you trust the authors?" → Click **Yes, I trust**

#### Step 4: Open Terminal inside VS Code

Inside VS Code, press: ``Ctrl + ` `` (Control + backtick key, above Tab)
Or Menu: **View → Terminal**

You will see a terminal at bottom. It should show path like `...EduBot-Fixed-Clean>`

#### Step 5: Setup (copy-paste these)

In that VS Code terminal, run one by one:

```bash
# 1. Check node
node -v

# 2. Install pnpm (required, do NOT use npm install)
corepack enable
corepack prepare pnpm@latest --activate

# 3. If you are on Windows, use Windows-friendly workspace
copy pnpm-workspace.local.yaml pnpm-workspace.yaml

# 4. Install all dependencies
pnpm install

# 5. Create env file
copy .env.example .env
# Now OPEN .env file in VS Code (click it in left explorer) and paste your GEMINI_API_KEY
# Get key from: https://aistudio.google.com/app/apikey

# 6. Start database (if you have Docker Desktop, else skip and use Neon.tech URL in .env)
docker-compose up -d

# 7. Prepare
pnpm --filter @workspace/api-spec run codegen
pnpm --filter @workspace/db run push
pnpm run build
```

#### Step 6: Run the Project (2 terminals)

VS Code terminal → Click **+** to create 2nd terminal.

**Terminal 1 - Backend:**
```bash
pnpm --filter @workspace/api-server run dev
# Wait for: Server listening { port: 8080 }
```

**Terminal 2 - Frontend:**
```bash
pnpm --filter @workspace/student-chatbot run dev
# It will show: Local: http://localhost:5173/
```

Then `Ctrl+Click` on that `http://localhost:5173` link to open your EduBot in browser.

---

#### How to open any file (.md, .ts, etc) inside VS Code?

- Left Explorer → Double-click any file
- For `.md` files (like this guide): Right-click file → **Open Preview** to see formatted view

#### Common Mistakes:

- **Opening zip directly in VS Code without extracting** → VS Code can't run zipped files. You MUST right-click → Extract All first.
- **Opening wrong folder** → If you open `artifacts/api-server` only, `pnpm install` fails. Must open root folder.
- **Using npm instead of pnpm** → You will see "Use pnpm instead" error. Always use `pnpm` commands.
- **.env missing** → Backend error `DATABASE_URL must be set`. Run `copy .env.example .env` and edit it.

Need a video? Tell me and I will record the steps for you.
