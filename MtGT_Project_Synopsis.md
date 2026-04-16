# Mind the Gap Together — Resource Portal
## Project Synopsis & Development Log

---

## 🌐 Project Overview

**Organization:** Mind the Gap Together, Inc.
**Main Website:** https://www.mindthegaptogether.org
**Resource Portal (Live):** https://unique-toffee-1b6e64.netlify.app
**Admin Portal:** https://unique-toffee-1b6e64.netlify.app/admin.html
**GitHub Repo:** https://github.com/JonNiswander/Mind-the-Gap-Together
**Developer:** Jon Niswander
**AI Partner:** Claude (Anthropic)

---

## 🎯 Project Purpose

A resource hub web application serving Pinellas County, FL residents in need. Provides searchable, organized listings of:
- Housing resources & Section 8 waitlists
- Healthcare (free clinics, mental health, vision, disability, SSI)
- Food pantries (with open-today detection)
- Job listings & job fairs
- Community resources (clothing, children & family)
- Volunteer opportunities

---

## 🏗️ Architecture

### Hosting & Deployment
- **Host:** Netlify (Pro plan)
- **Repo:** GitHub (JonNiswander/Mind-the-Gap-Together)
- **Deploy:** Auto-deploy on GitHub push
- **Domain:** unique-toffee-1b6e64.netlify.app

### Tech Stack
- **Frontend:** Vanilla HTML/CSS/JS (single page app)
- **Data:** data.json (flat file database in GitHub repo)
- **Backend:** Netlify Serverless Functions (Node.js)
- **Forms:** Netlify Forms (data-netlify="true")
- **Admin Auth:** Simple username/password in admin.html
- **Saves:** localStorage (no login required)
- **Future:** Supabase (client accounts, Phase 2)

### File Structure
```
/
├── index.html              # Main public site
├── admin.html              # Admin portal
├── data.json               # All resource data
├── netlify/
│   └── functions/
│       ├── publish.js      # Pushes data.json to GitHub via API
│       └── submissions.js  # Fetches/deletes Netlify form submissions
└── admin/
    ├── config.yml          # Netlify CMS config (legacy, leave alone)
    └── index.html          # Netlify CMS (legacy, leave alone)
```

---

## 🔐 Credentials & Config

### Netlify
- **Site ID (UUID):** ecb41d3a-bc77-43e9-b3fe-6b39ec92683f
- **Site name:** unique-toffee-1b6e64
- **Environment Variables:**
  - `GITHUB_TOKEN` — GitHub PAT with repo scope
  - `NETLIFY_TOKEN` — Netlify API token

### GitHub
- **Repo:** JonNiswander/Mind-the-Gap-Together
- **Branch:** main
- **Key files:** index.html, admin.html, data.json

### Admin Portal
- **URL:** /admin.html
- **Username:** admin
- **Password:** [set manually in admin.html — search for ADMIN_PASS]

---

## 📁 Files Created

| File | Location | Purpose |
|------|----------|---------|
| `index.html` | repo root | Main public-facing resource portal |
| `admin.html` | repo root | Admin CMS portal |
| `data.json` | repo root | All resource data (food, housing, jobs, fairs, resources) |
| `publish.js` | netlify/functions/ | Secure GitHub API proxy — pushes data.json |
| `submissions.js` | netlify/functions/ | Secure Netlify Forms API proxy |

---

## 📊 Data Structure (data.json)

```json
{
  "food": [
    { "id", "name", "address", "phone", "hours", "days": ["Mon","Tue"...], "desc", "accepts": [] }
  ],
  "housing": [
    { "id", "name", "type", "status": "open|waitlist|closed", "address", "phone", "url" }
  ],
  "jobs": [
    { "id", "title", "company", "location", "pay", "type": "full|part|temp", "tags": [] }
  ],
  "fairs": [
    { "id", "name", "date", "location", "time", "cost", "status" }
  ],
  "resources": [
    { "id", "name", "category", "desc", "phone", "address" }
  ]
}
```

**Current counts:**
- Food Pantries: 10
- Housing Cards: 6
- Job Listings: 5
- Job Fairs: 2
- Resources: 26

---

## 🔄 Admin Workflow

### Publishing Content
1. Log into /admin.html
2. Add/edit/delete any content
3. Changes auto-publish to GitHub on save/delete
4. Netlify deploys in ~30 seconds
5. Live site updates ✅

### Processing Form Submissions
1. Visitor submits form on live site
2. Netlify captures it
3. Admin → Submissions tab → 🔄 Refresh
4. Submissions sorted into tabs:
   - 💼 Publish Queue (job postings, rental listings) → Approve & Publish
   - 📋 To Review (navigator requests, volunteers, SSI, mentors)
   - ❤️ Donations
   - ✅ Done
5. Click "Approve & Publish" → auto-publishes to live site

---

## 📝 Public Forms (Netlify Forms)

| Form Name | Purpose |
|-----------|---------|
| `navigator-request` | Housing navigator appointments |
| `volunteer-application` | Volunteer signups |
| `job-posting` | Employer job submissions |
| `job-application` | Job seeker applications |
| `rental-listing` | Landlord listings |
| `ssi-advocate` | SSI benefits help requests |
| `mentor-request` | Entrepreneurship mentor requests |
| `donation` | Donation info |

---

## 🎨 Design & Branding

### Colors (matching MtGT.org logo)
```css
--primary: #0f78b4;        /* Deep blue */
--primary-light: #1889c6;  /* Brand blue (logo color) */
--secondary: #1abc9c;      /* Teal accent */
--accent: #e67e22;         /* Orange */
--success: #27ae60;        /* Green */
--danger: #e74c3c;         /* Red */
```

### Typography
- Body: Segoe UI / Arial
- Banner headings: Montserrat 900 (Google Fonts)

### Key UI Elements
- **Banner:** White, 96px tall, real MtGT logo image, links to mindthegaptogether.org
- **Nav tabs:** Sticky, brand blue underline on active
- **Quick filter pills:** On each tab for fast navigation
- **Cards:** White, left border accent, save star button
- **Saves system:** localStorage, green highlight when saved, ★ Saves button in banner

---

## ✅ Features Complete

- [x] Public resource site with 6 tabs
- [x] Dynamic data loading from data.json
- [x] Food pantry open-today detection
- [x] Housing filter by type
- [x] Job search/filter
- [x] 8 public forms → Netlify Forms
- [x] Admin portal with login
- [x] Admin CRUD for all data types
- [x] Auto-publish to GitHub on save/delete
- [x] Netlify Functions (secure token proxy)
- [x] Submissions inbox with tabs
- [x] Approve & Publish flow
- [x] Brand colors matching MtGT.org
- [x] Real logo in banner
- [x] Quick filter pills on each tab
- [x] ★ Saves system (localStorage)
- [x] Donate tab → links to MtGT.org
- [x] ⚙ Admin button in banner
- [x] Donate Goods moved to Resources tab

---

## 🔜 Roadmap (Next Steps)

### Website (In Progress)
- [ ] Verify all resource data accuracy (phones, addresses, hours)
- [ ] Email notifications for Netlify form submissions
- [ ] Add more Pinellas County resources
- [ ] Mobile responsiveness polish

### Phase 2 — Client Accounts
- [ ] Supabase setup (project created, keys obtained)
- [ ] 👤 Client Login modal (Email + 4-digit PIN)
- [ ] Universal Intake Form (25 fields across 5 categories):
  1. Identity & Contact (4-5 fields)
  2. Current Situation (4-5 fields)
  3. Income & Employment (3-4 fields)
  4. Health & Support Needs (4-6 fields)
  5. Housing Needs & Preferences (3-4 fields)
- [ ] Saves synced to account (cross-device)
- [ ] Auto-fill forms using profile data

### Phase 3 — PWA (Progressive Web App)
- [ ] manifest.json
- [ ] service-worker.js (offline support)
- [ ] Meta tags in index.html
- [ ] App icon set
- [ ] "Add to Home Screen" prompt
- [ ] Goal: installable on iOS/Android this week

### Phase 4 — Native iOS App
- [ ] Apple Developer account ($99/year)
- [ ] React Native / Expo build
- [ ] Shares existing Netlify Functions + Supabase backend
- [ ] App Store submission
- [ ] Timeline: After client accounts are stable

### Future Features
- [ ] ❤️ Donation portal integration (Stripe/PayPal on MtGT.org)
- [ ] Donation tab flow: view submissions → send thank you → link to portal
- [ ] Multi-county expansion (Hillsborough, Pasco)
- [ ] Multi-user admin logins
- [ ] Push notifications (iOS)
- [ ] Resource verification / link checking automation

---

## 🐛 Known Issues & Notes

- The `/admin` folder contains legacy Netlify CMS files (config.yml, index.html) — **leave these alone**
- Admin password is hardcoded in admin.html — search for `ADMIN_PASS` to update
- GitHub token must be "classic" type with `repo` scope — fine-grained tokens cause issues
- Netlify's secret scanner will block commits containing raw tokens — always use environment variables
- When updating admin.html, always use diffchecker.com to review changes before committing
- After any environment variable change in Netlify, trigger a manual redeploy
- The Netlify site name (unique-toffee-1b6e64) ≠ the Site UUID (ecb41d3a-...) — API calls need the UUID

---

## 📞 Emergency Contacts / Resources

- 211 — General help
- 988 — Mental health crisis
- Homeless Hotline: (727) 442-9041
- Food Emergency: (727) 893-1515

---

*Last updated: April 15, 2026*
*Built with Claude (Anthropic) — Claude Sonnet 4.6*
