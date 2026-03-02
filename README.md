# StockSim — Setup Guide

A real-time stock trading classroom simulation. Teachers create sessions, students trade against each other using real historical stock data.

---

## File Structure

```
stocksim/
├── index.html          ← Landing page
├── teacher.html        ← Teacher dashboard (create & run sessions)
├── student.html        ← Student trading interface
├── css/
│   └── style.css       ← Shared styles
├── js/
│   ├── firebase-config.js  ← YOUR Firebase config goes here
│   └── stockData.js        ← Historical stock price data
├── firebase-rules.json     ← Firebase Realtime DB security rules
└── README.md
```

---

## Step 1 — Create a Firebase Project

1. Go to https://console.firebase.google.com
2. Click **Add project**, name it (e.g. `stocksim-classroom`)
3. Disable Google Analytics (optional), click **Create project**

---

## Step 2 — Enable Realtime Database

1. In the Firebase console sidebar, click **Build → Realtime Database**
2. Click **Create Database**
3. Choose a location (pick the one closest to you)
4. Select **Start in test mode** (we'll lock it down with rules next)
5. Click **Enable**

---

## Step 3 — Set Database Security Rules

1. In Realtime Database, click the **Rules** tab
2. Replace everything with the contents of `firebase-rules.json`:

```json
{
  "rules": {
    "sessions": {
      "$sessionId": {
        ".read": true,
        ".write": true,
        "players": {
          "$playerId": {
            ".read": true,
            ".write": true
          }
        }
      }
    }
  }
}
```

3. Click **Publish**

---

## Step 4 — Get Your Firebase Config

1. In the Firebase console, click the **gear icon ⚙️** next to Project Overview → **Project settings**
2. Scroll down to **Your apps** → click the **</>** (Web) icon to register a web app
3. Name it `stocksim`, click **Register app**
4. Copy the `firebaseConfig` object that looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## Step 5 — Add Config to the Project

Open `js/firebase-config.js` and replace the placeholder config with your real values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_REAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
```

---

## Step 6 — Host on GitHub Pages

### 6a. Create a GitHub Repo

1. Go to https://github.com → **New repository**
2. Name it `stocksim` (or whatever you like)
3. Set it to **Public**
4. Click **Create repository**

### 6b. Push Your Files

```bash
# In your stocksim folder:
git init
git add .
git commit -m "Initial StockSim setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stocksim.git
git push -u origin main
```

### 6c. Enable GitHub Pages

1. In your GitHub repo, go to **Settings → Pages**
2. Under **Source**, select **Deploy from a branch**
3. Branch: `main`, folder: `/ (root)`
4. Click **Save**
5. After ~1 minute, your site will be live at:
   `https://YOUR_USERNAME.github.io/stocksim/`

---

## Step 7 — Add Firebase Domain to Authorized Domains (optional but recommended)

1. In Firebase console → **Authentication → Settings → Authorized domains**
2. Add `YOUR_USERNAME.github.io`

---

## How to Run a Session

### Teacher
1. Go to `yoursite/teacher.html`
2. Select a stock from the grid (each has a codename — the real ticker is hidden from students)
3. Set starting money and time period
4. Click **Create Session** → a 6-character code appears
5. Share the code with students
6. Students join at `yoursite/student.html`
7. Once students have joined, click **Start Simulation**
8. Every 10 seconds = 1 month of price history
9. After the simulation ends, the real ticker is revealed

### Student
1. Go to `yoursite/student.html`
2. Enter the session code and your name
3. Study the preview chart in the lobby — guess what stock it might be!
4. When the teacher starts, buy/sell shares in real time
5. After the game ends, see the final leaderboard and ticker reveal

---

## Stocks Available

| Code | Nickname | Sector |
|------|----------|--------|
| AAPL | Tech Giant A | Technology |
| TSLA | Electric Vehicle Co. | Automotive |
| AMZN | E-Commerce & Cloud Giant | Technology/Retail |
| MSFT | Enterprise Software Leader | Technology |
| META | Social Media Platform | Technology |
| GME  | Retail Gaming Store | Retail |
| NVDA | Chip Maker X | Technology |

All price data covers Jan 2019 – Dec 2024 monthly closes.

---

## Notes

- **No API key needed for stock data** — prices are baked in to `stockData.js`
- Sessions auto-expire from Firebase after they end (you can add cleanup rules)
- Works on mobile for students
- The Firebase API key in your config is safe to commit to a public repo — it's restricted by Firebase security rules
