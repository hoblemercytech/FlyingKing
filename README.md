# ♛ Flying Kings Draughts

> A premium 16×16 international draughts game playable in any browser — no download required. Challenge the AI or play against a friend online in real time.

---

## 🎮 Live Demo

Deploy the project to [vercel](https://vercel.com) by dragging the project folder and your live link is ready instantly.

---

## 📁 Project Files


flying-kings/
├── index.html        ← Rename flying-kings.html to this for Vercel
├── manifest.json     ← PWA manifest (app name, icons, theme)
├── sw.js             ← Service worker (offline caching)
├── icon-192.png      ← App icon (you generate this)
├── icon-512.png      ← App icon large (you generate this)
└── README.md         ← This file


> **Important:** When uploading to Vercel, rename `flying-kings.html` to `index.html` so the site loads correctly at the root URL.

---

## ✨ Features

### Gameplay
- **16×16 board** — larger than standard draughts, more strategic depth
- **48 pieces per player** — 6 full rows each
- **Flying Kings** — kings move and capture any distance diagonally
- **Mandatory captures** — forced capture with maximum-piece rule enforced automatically
- **Must-capture flash** — pieces that must capture pulse/glow on your turn so you never miss them
- **Piece promotion** — reach the back row to become a ♛ King

### Single Player
- **5 difficulty levels** — Tutorial, Easy, Medium, Hard, Expert
- **Tutorial mode** — 7-step guided walkthrough for beginners with pop-up bubbles
- **Minimax AI** with alpha-beta pruning (depth 2–6 depending on difficulty)
- **Improved AI evaluation** — center control, back-row defense, king safety scoring
- **↩ Undo** — undo your last full round (your move + AI response) for free
- **Move timer** — optional 30s / 1min / 2min per turn with auto-move on timeout

### Multiplayer
- **Real-time online play** via Supabase Realtime (WebSocket)
- **6-character room codes** — share with a friend to start instantly
- **Heartbeat presence** — detects if opponent disconnects within 12 seconds
- **Emoji reactions** — send 👍 😅 🎉 🤔 😱 that float up on both screens
- **Rematch button** — jump straight back to lobby after a game ends
- **Resign system** — opponent is notified and awarded the win

### UI & UX
- **Animated piece movement** — pieces slide across the board
- **Board coordinates** — A–P columns and 1–16 rows labeled on the edges
- **Move history panel** — toggle a scrollable log of every move in algebraic notation (e.g. `C6→D5`)
- **▶ Replay mode** — scrub through the entire game after it ends with a slider
- **💡 Hint system** — costs 1 point, highlights valid moves for selected piece or suggests best move if nothing selected
- **Sound effects** — move, capture, king promotion, win, lose, undo, hint, timer tick
- **Dark premium theme** — deep navy/black with amber and crimson accents
- **Fully responsive** — works on all screen sizes, mobile-first design

### PWA (Progressive Web App)
- **Installable** — users can add to home screen on iOS and Android
- **Offline support** — core game works without internet via service worker cache
- **App-like experience** — runs fullscreen, no browser chrome
- **Install prompt** — automatically prompts users to install after 30 seconds

---

## 🚀 Deployment (Vercel — Free, No Laptop Needed)

1. Go to [vercel.com](https://vercel.com) on your phone
3. Sign up for a free account
4. Tap **"Add new site" → "Deploy manually"**
5. Rename `flying-kings.html` to `index.html`
6. Drag all files into the deploy box:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
7. Your live URL is ready in seconds (e.g. `https://flying-kings.netlify.app`)

---

## 📱 Installing as an App

### Android
1. Open the live URL in Chrome
2. Tap the browser menu (⋮)
3. Tap **"Add to Home Screen"**
4. The game installs like a native app

### iOS (Safari)
1. Open the live URL in Safari
2. Tap the **Share** button (□↑)
3. Tap **"Add to Home Screen"**
4. Tap **Add**

### Via Gonative.io (Real APK/IPA)
1. Go to [gonative.io](https://gonative.io) on your phone
2. Paste your Netlify URL
3. Configure app name and icons
4. Download your APK (Android) or IPA (iOS)
5. No laptop or Xcode/Android Studio required

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript (no frameworks) |
| Realtime multiplayer | [Supabase](https://supabase.com) Realtime + PostgreSQL |
| Offline/PWA | Service Worker + Web App Manifest |
| Fonts | Google Fonts — Inter |
| Audio | Web Audio API (no external library) |
| Hosting | Vercel (recommended) |
| AI engine | Minimax with alpha-beta pruning |

---

## 🧠 AI Engine

The computer opponent uses the **Minimax algorithm with alpha-beta pruning**:

| Difficulty | Search Depth | Behavior |
|---|---|---|
| Tutorial | Easy mode | Rarely captures, mostly random |
| Easy | Random | Prefers captures only 35% of the time |
| Medium | 2 plies | Decent positional play |
| Hard | 4 plies | Strong — thinks 2 full rounds ahead |
| Expert | 6 plies | Very strong — thinks 3 full rounds ahead |

**Evaluation factors:**
- Material count (pieces and kings)
- King value = 3.5× regular piece
- Advancement toward promotion
- Center board control
- Back-row protection bonus

---

## 🗄 Database Schema (Supabase)

### `draughts_tables`
| Column | Type | Description |
|---|---|---|
| `id` | uuid | Primary key |
| `code` | text | 6-character room code |
| `status` | text | `waiting`, `active`, `finished` |
| `board` | jsonb | Full board state (16×16 array) |
| `turn` | text | `amber` or `crimson` |
| `host_name` | text | Player 1 display name |
| `guest_name` | text | Player 2 display name |
| `last_move` | jsonb | `{from, to}` coordinates |
| `winner` | text | `amber`, `crimson`, or null |
| `resigned_by` | text | Color of resigning player |
| `host_last_seen` | timestamp | Heartbeat for disconnect detection |
| `guest_last_seen` | timestamp | Heartbeat for disconnect detection |
| `last_reaction` | text | Emoji reaction (e.g. `amber:🎉:1234567`) |

### `game_point`
| Column | Type | Description |
|---|---|---|
| `id` | uuid | Primary key |
| `player_name` | text | Player display name |
| `points` | int | Lifetime point total |
| `updated_at` | timestamp | Last updated |

---

## 🎨 Design Tokens


--bg:        #080a0f   /* Page background */
--surface:   #12151f   /* Card/panel background */
--amber:     #f0a830   /* Player 1 color / primary accent */
--crimson:   #d43030   /* Player 2 color */
--accent:    #4f7ecf   /* Blue accent / buttons */
--green:     #22c55e   /* Turn indicator / success */
--text:      #eef0f8   /* Primary text */
--text-dim:  #60657e   /* Muted text */

---

## 🎮 Game Rules Summary

1. **Board** — 16×16, dark squares only
2. **Start** — each player has 48 pieces on the first 6 rows
3. **Move** — regular pieces move diagonally forward one square
4. **Capture** — jump diagonally over an enemy piece; it is removed
5. **Mandatory** — if a capture is available you MUST take it
6. **Maximum** — you must take the path capturing the MOST pieces
7. **Promotion** — reach the opponent's back row to become a King ♛
8. **Flying King** — kings move/capture any number of squares diagonally in any direction
9. **Win** — capture all opponent pieces or leave them with no legal moves

---

## 📝 Known Limitations

- Undo is only available in single-player mode (not multiplayer)
- Multiplayer room codes expire when the table is deleted from Supabase
- Expert AI may be slow on older/low-end phones due to 6-ply search
- The `esm.sh` Supabase import requires an internet connection (intentional for multiplayer)

---

## 🔮 Possible Future Features

- [ ] Account system / leaderboard
- [ ] Push notifications when it's your turn
- [ ] Game timer (chess clock style)
- [ ] Opening book for Expert AI
- [ ] Share replay as a link
- [ ] Spectator mode
- [ ] Custom board themes

---

## 👤 Author
Built by HoblemercyTech with vanilla HTML/CSS/JS and a lot of ♛ energy.  
Coded on **SPCK Editor** (iOS) — no laptop required.

---

## 📄 License

MIT — free to use, modify, and distribute
