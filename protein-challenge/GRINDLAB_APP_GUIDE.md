# Grind Lab Fitness — 7-Day Protein Jumpstart Challenge App
## Complete Build Guide & Reference

---

## What Was Built

A fully gamified participant-facing web app for the 7-Day Protein Jumpstart Challenge.

**Participant features:**
- Sign up with name + email, pick an avatar (or upload a photo)
- 7 days of guided lessons, challenge tasks, and protein tips
- Protein tracker (log meals + auto-total)
- Habit checklist (+10 XP per item)
- Daily reflection journal (+20 XP)
- Facebook group bonus (+50 XP, unlocks Social Wings 🦋)
- XP system with 5 levels: Protein Rookie → Fuel Seeker → Protein Warrior → Power Player → Protein Champion
- 7 unlockable reward items (one per day completed)
- Ask your coach — AI drafts an answer in your tone, you approve it
- In-app notifications (bell icon)
- Final results page with PDF download

**Coach/admin features:**
- Admin dashboard at `/admin`
- See all participant questions
- Edit AI-drafted answers before sending
- Participant gets your answer in-app + by email

---

## Live URLs

| What | Link |
|------|------|
| **Participant app** | https://learning-area-iota.vercel.app/ |
| **Admin dashboard** | https://learning-area-iota.vercel.app/admin |
| **Admin password** | `grindlab2024` |
| **Facebook group** | https://www.facebook.com/groups/4378612459123843 |

---

## Tech Stack

| Tool | What it does | Free? |
|------|-------------|-------|
| **Next.js 14** | The app framework | ✅ Free |
| **Tailwind CSS** | Styling | ✅ Free |
| **localStorage** | Saves participant progress in their browser | ✅ Free |
| **Claude API** (Anthropic) | Generates AI draft answers in your tone | 💳 Pay per use (~$1-2 for whole challenge) |
| **Resend** | Sends emails (question alerts + answers) | ✅ Free up to 3,000/month |
| **GitHub** | Stores the code | ✅ Free |
| **Vercel** | Hosts/deploys the app | ✅ Free (Hobby plan) |

---

## Accounts You Need

### 1. GitHub
- **URL:** https://github.com
- **Repo:** https://github.com/dee1612/learning-area
- **Branch with the app code:** `claude/protein-challenge-web-app-pTnEu`
- **What it does:** Stores all the code. Vercel reads from here to deploy.

### 2. Vercel
- **URL:** https://vercel.com
- **Project:** learning-area
- **What it does:** Hosts the live app. Auto-deploys every time you push code to GitHub.
- **To redeploy manually:** Deployments tab → 3 dots on latest → Redeploy

### 3. Anthropic (Claude API)
- **URL:** https://console.anthropic.com
- **What it does:** Powers the AI answers in your coach tone
- **To get your key:** Console → API Keys → Create Key (starts with `sk-ant-...`)
- **Cost:** Pay as you go. For a small challenge group, expect $0.50–$2 total.

### 4. Resend (Email — ACTION NEEDED)
- **URL:** https://resend.com
- **What it does:** Sends you an email when a participant asks a question (includes AI draft). Sends participant an email when you answer.
- **To get your key:** Sign up → API Keys → Create API Key (starts with `re_...`)
- **Free tier:** 3,000 emails/month
- **⚠️ This is NOT set up yet — do this to enable emails!**

---

## Environment Variables (in Vercel)

Go to: Vercel → your project → Settings → Environment Variables

| Variable | What it is | Where to get it |
|----------|-----------|-----------------|
| `ANTHROPIC_API_KEY` | Claude AI key | console.anthropic.com → API Keys |
| `RESEND_API_KEY` | Email sending key | resend.com → API Keys |
| `FROM_EMAIL` | Email address emails come from | Use `onboarding@resend.dev` for testing, or your own domain |
| `ADMIN_EMAIL` | Your email — where question alerts go | Your email address |
| `NEXT_PUBLIC_APP_URL` | Your live app URL | `https://learning-area-iota.vercel.app` |

After changing any variable → Deployments tab → Redeploy latest.

---

## How to Make Changes to the App

### Step 1 — Tell me what to change
Examples:
- "Change the challenge start date"
- "Edit the Day 3 lesson"
- "Change the admin password"
- "Add a new FAQ page"

I'll make the edit in the code.

### Step 2 — Get a GitHub token
1. Go to github.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic) → check **repo** → Generate
3. Copy the token (starts with `ghp_...`)

### Step 3 — Paste the token here
I'll run the push and Vercel auto-deploys within ~2 minutes.
**Delete the token from GitHub after each use** (Settings → Developer settings → Personal access tokens → Delete).

---

## Key Files & What They Do

```
protein-challenge/
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Landing page + sign-up flow
│   │   ├── layout.tsx            ← App shell (fonts, metadata)
│   │   ├── globals.css           ← Brand styles, animations
│   │   ├── admin/
│   │   │   ├── page.tsx          ← Admin dashboard home
│   │   │   └── questions/page.tsx ← Q&A approval queue
│   │   └── api/
│   │       ├── ai/answer/        ← Claude AI answer endpoint
│   │       ├── ai/stylize/       ← Avatar photo description
│   │       └── admin/send-answer/ ← Email answer to participant
│   ├── components/
│   │   ├── ChallengeApp.tsx      ← Main app shell + navigation
│   │   ├── DayView.tsx           ← Each day's full content
│   │   ├── AIChat.tsx            ← Ask your coach chat
│   │   ├── ProgressView.tsx      ← XP + stats + chart
│   │   ├── ResultsView.tsx       ← Final results + PDF download
│   │   ├── AvatarView.tsx        ← Avatar + item collection
│   │   ├── RewardUnlock.tsx      ← Reward popup modal
│   │   ├── NotificationBell.tsx  ← Bell icon + dropdown
│   │   └── XPBar.tsx             ← XP progress bar
│   └── lib/
│       ├── challengeData.ts      ← All 7 days content + rewards
│       ├── gamification.ts       ← XP levels + preset avatars
│       └── store.ts              ← localStorage save/load
├── tailwind.config.ts            ← Brand colors (#07b0a4 teal, #C8F53A lime)
└── package.json                  ← Dependencies
```

---

## Brand Colors

| Color | Hex | Used for |
|-------|-----|---------|
| Teal | `#07b0a4` | Primary — buttons, XP bar, accents |
| Lime | `#C8F53A` | Secondary — gradients, Day 3 + Day 7 |
| Pink | `#FF6B9D` | Accents — Facebook bonus, notifications |
| Black | `#0A0A0A` | Headings, dark sections |
| White | `#FAFAFA` | Background |

**Fonts:** Syne (headings) + DM Sans (body) — loaded from Google Fonts

---

## Reward Items (unlocked by completing each day)

| Day | Item | XP |
|-----|------|-----|
| Day 1 | 🔮 Awareness Gem | +75 XP |
| Day 2 | 🛡️ Goal Shield | +80 XP |
| Day 3 | 👑 Breakfast Crown | +85 XP |
| Day 4 | 🦸‍♀️ Formula Cape | +90 XP |
| Day 5 | ⚔️ Backup Blade | +90 XP |
| Day 6 | 🧪 Prep Potion | +95 XP |
| Day 7 | 🏆 Champion Belt | +150 XP |
| Bonus | 🦋 Social Wings | +50 XP (Facebook post) |

---

## XP Levels

| Level | Title | XP Range |
|-------|-------|----------|
| 1 | 🌱 Protein Rookie | 0–99 XP |
| 2 | 💧 Fuel Seeker | 100–249 XP |
| 3 | ⚡ Protein Warrior | 250–449 XP |
| 4 | 🔥 Power Player | 450–699 XP |
| 5 | 🏆 Protein Champion | 700+ XP |

---

## ⚠️ Things Still To Do

- [ ] **Set up Resend** (resend.com) so emails work — add `RESEND_API_KEY` in Vercel
- [ ] **Update `NEXT_PUBLIC_APP_URL`** in Vercel to `https://learning-area-iota.vercel.app`
- [ ] **Optional:** Add a public FAQ page so participants can see answered questions
- [ ] **Optional:** Change admin password from `grindlab2024` to something private

---

## How the AI Coach Tone Works

The AI answers questions in your voice using this personality:
- Warm and direct ("Ok yes!", "Listen,", "Hey girl!")
- Celebrates every win ("yay!!!", "I am SO proud of you!!")
- Simplifies everything — one thing at a time
- Never shames or guilt-trips
- Always mentions 1-on-1 coaching at the end

To update the tone, edit `src/lib/challengeData.ts` → `COACH_TONE_SYSTEM_PROMPT`

---

*Built with Claude Code · April 2026*
