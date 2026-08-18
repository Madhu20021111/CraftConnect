# 🏺 CraftConnect

> **Bridging the gap between traditional master artisans and conscious craft lovers worldwide through direct communication, transparent pricing, and fair-trade principles.**

---

## 📖 Overview

**CraftConnect** is a digital craft ecosystem and direct-to-artisan marketplace. Unlike traditional e-commerce platforms that insert middlemen, fees, and opaque markups, CraftConnect empowers local artisans and rural craft communities by showcasing their heritage techniques, stories, and handcrafted pieces with **direct contact channels** (Phone, WhatsApp, and Email).

---

## ✨ Key Features

### 🛍️ Curated Marketplace (`/products`)
- **Live Categorical Filtering:** Dynamically browsable by craft discipline (*Pottery, Weaving, Woodwork, Candle Making, Jewelry, Block Printing, etc.*) with real-time inventory counts.
- **Interactive Price Range Slider:** Filter pieces by budget with real-time feedback in Rupees (`Rs.`).
- **Artisan Region / Village Filter:** Multi-select filtering powered by authentic artisan workshop locations (*Embilipitiya, Rathnapura, Ampara, Mannar, etc.*).
- **Dynamic Sorting:** Sort collection by *Featured*, *Price: Low to High*, *Price: High to Low*, and *Newest*.

### 🏺 Artisans Directory & Profiles (`/artisans`, `/artisans/[id]`)
- **Instant Search:** Search artisans in real-time by name, village, or craft discipline.
- **Expanded Handcraft Specialties:** Discover masters across 15+ traditional craft categories.
- **Public Profile Showcase:** View the artisan's bio, location, years of mastery, full artwork collection, and **direct contact details** (Phone/WhatsApp and Email).

### 🎨 Artisan Studio Dashboard (`/dashboard`)
- **Profile Management:** Update studio biography, contact information, years of experience, and workshop avatar.
- **Artwork Publishing & Editing:** Upload high-resolution craft photos with detailed attributes (Dimensions, Material, Color, Category, Price).

### 🛡️ Admin Control Panel (`/admin/dashboard`)
- **Comprehensive User Management:** Unified directory of all registered accounts and standalone artisan profiles.
- **Safe Cascade Deletion:** Administrators can purge stale profiles, cascading across associated artworks and media.
- **Self-Protection Guard:** Built-in safeguards preventing accidental deletion of the primary administrator account.

### 🔒 Security & Access Control
- **Role-Based Access Control (RBAC):** Protected routes with JWT authentication for artisans and strict email/role whitelisting for administrators.
- **Hardened File Uploads (Multer):** Strict MIME-type validation (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`) and a 5MB size limit.
- **Password Visibility Toggle:** Interactive eye icon button on sign-in and registration forms.
- **Relational Integrity:** Enabled `PRAGMA foreign_keys = ON;` in SQLite.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **UI & Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom Glassmorphic Theme
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State & HTTP:** [Axios](https://axios-http.com/) with automatic token interceptors
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) & Custom JWT integration

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (Express 5)
- **Database:** [SQLite](https://www.sqlite.org/) via `sqlite` & `sqlite3`
- **Security:** `jsonwebtoken` (JWT), `bcryptjs`, `cors`, `dotenv`
- **Media Uploads:** `multer` with file filtering and size constraints

---

## 📁 Repository Structure

```
CraftConnect/
├── backend/
│   ├── config/
│   │   └── db.js                 # SQLite connection & foreign key enforcement
│   ├── controllers/
│   │   ├── adminController.js    # Admin user management & deletion
│   │   ├── artisanController.js  # Artisan profiles & image uploads
│   │   ├── authController.js     # User registration & login (JWT)
│   │   └── productController.js  # Artworks CRUD & public marketplace API
│   ├── middleware/
│   │   └── auth.js               # JWT verification & requireAdmin middleware
│   ├── routes/
│   │   ├── admin.js              # Protected admin routes
│   │   ├── artisans.js           # Public and private artisan routes
│   │   ├── auth.js               # Authentication endpoints
│   │   └── products.js           # Artwork marketplace routes
│   ├── uploads/                  # Uploaded artisan & artwork images
│   ├── database.sqlite           # SQLite relational database
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── app/
│   │   ├── admin/dashboard/      # Administrator user control panel
│   │   ├── artisans/             # Public artisans directory & profile pages
│   │   │   ├── [id]/             # Single artisan profile & collection
│   │   │   └── join/             # Artisan application submit page
│   │   ├── auth/signin/          # Sign In / Sign Up with eye password toggle
│   │   ├── dashboard/            # Artisan studio dashboard
│   │   │   ├── artworks/         # Manage published artworks
│   │   │   └── profile/          # Edit artisan public profile
│   │   ├── onboarding/           # Role selection (Artisan vs Collector)
│   │   ├── products/             # Public curated marketplace with live filters
│   │   │   └── [id]/             # Artwork details & Meet the Artisan section
│   │   ├── globals.css           # Custom theme colors & typography
│   │   └── page.tsx              # Homepage with Maker's Journey & Hero
│   ├── components/
│   │   ├── ArtisanCard.tsx       # Reusable artisan profile card
│   │   ├── Hero.tsx              # Main homepage hero banner
│   │   ├── Navbar.tsx            # Sticky navigation with role-aware dropdown
│   │   └── ProductCard.tsx       # Reusable artwork product card
│   ├── public/                   # Static assets, logos, and local imagery
│   └── services/
│       └── api.ts                # Axios instance with auth interceptor
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**

---

### 1. Clone the Repository
```bash
git clone https://github.com/Madhu20021111/CraftConnect.git
cd CraftConnect
```

---

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:
```env
PORT=5000
JWT_SECRET=craftconnect_secure_jwt_token_secret_key_2026_production
```

Start the backend server:
```bash
node server.js
```
*Backend API will run at `http://localhost:5000`.*

---

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```

Start the Next.js development server:
```bash
npm run dev
```
*Frontend application will run at `http://localhost:3000`.*

---

## 🔑 Default Roles & Access

| Role | Access URL | Credentials |
| :--- | :--- | :--- |
| **Administrator** | `http://localhost:3000/admin/dashboard` | **Email:** `niroshamadumali37@gmail.com`<br/>**Password:** `admin@123!` |
| **Artisan** | `http://localhost:3000/dashboard` | Registered via `/auth/signin` or `/artisans/join` |
| **Public User** | `http://localhost:3000/products` | No login required (Browse, Search, Inquire) |

---

## 📡 API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new user account
- `POST /api/auth/login` — Sign in and obtain JWT token

### 🏺 Artisans (`/api/artisans`)
- `GET /api/artisans` — Get all public artisans (excludes admin)
- `GET /api/artisans/:id` — Get single artisan details by ID
- `GET /api/artisans/my-profile` *(Auth)* — Get logged-in artisan profile
- `PUT /api/artisans/my-profile` *(Auth)* — Update artisan profile details
- `POST /api/artisans/:id/upload` *(Auth)* — Upload artisan profile photo

### 🛍️ Products & Artworks (`/api/products`)
- `GET /api/products` — Get all published artworks with artisan details
- `GET /api/products/:id` — Get product details and artisan information
- `GET /api/products/artisan/:artisanId` — Get artworks published by a specific artisan
- `GET /api/products/my-artworks` *(Auth)* — Get artworks belonging to logged-in artisan
- `POST /api/products` *(Auth)* — Publish a new artwork with image upload
- `PUT /api/products/:id` *(Auth)* — Update artwork details / photo
- `DELETE /api/products/:id` *(Auth)* — Delete an artwork

### 🛡️ Admin Management (`/api/admin`)
- `GET /api/admin/users` *(Admin Only)* — Get unified list of users and artisan profiles
- `DELETE /api/admin/profiles/:type/:id` *(Admin Only)* — Delete profile and cascade artworks

---

## 📄 License
This project is licensed under the **ISC License**.
