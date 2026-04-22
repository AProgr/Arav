# Arav Project — Claude Memory

## Систем
Мэдээлэл оруулах, хайх, тайлан гаргах систем.
Иргэний (fact_civil) бүртгэл — 10/100/1000-ын дарга нар мобайлаас, admin-ууд PC-ээс ашиглана.

## Tech Stack
- Frontend: Next.js 16.2.4 + Tailwind v4 → `frontend/` (port 3000)
- Backend: Node.js + Express → `backend/` (port 3001)
- Database: PostgreSQL 16 (Docker container: `arav_db`, port 5432)
- DB: host=localhost, db=arav, user=arav_user, pass=arav_pass

## Server эхлүүлэх
```bash
# Database
docker start arav_db

# Backend
cd "d:/my app/Arav/backend"
/c/Program\ Files/nodejs/node.exe src/index.js

# Frontend
cd "d:/my app/Arav/frontend"
/c/Program\ Files/nodejs/node.exe node_modules/next/dist/bin/next dev --port 3000
```

> Node.js нь bash PATH-д байхгүй — бүтэн зам ашиглах шаардлагатай
> `node_modules/.bin/next` Windows bash дээр ажиллахгүй — `node_modules/next/dist/bin/next` ашиглах

## Test хэрэглэгч
- username: `admin`
- password: `admin123`

## Файлын бүтэц
```
Arav/
├── .claude/
│   └── project_state.md       ← энэ файл
├── .gitignore
├── CLAUDE.md
├── backend/
│   ├── package.json
│   └── src/
│       ├── index.js            ← Express сервер, /api/auth, /api/civil
│       ├── db.js               ← PostgreSQL pool
│       ├── middleware/auth.js  ← JWT middleware
│       ├── routes/auth.js      ← login, register
│       ├── routes/civil.js     ← CRUD + search (auth шаардана)
│       ├── controllers/authController.js
│       └── controllers/civilController.js
├── database/
│   ├── docker-compose.yml
│   ├── migrate.js
│   └── migrations/
│       ├── 001_create_sec_role.sql      ✓ ажилласан
│       ├── 002_create_sec_user.sql      ✓ ажилласан
│       ├── 003_create_sec_user_role.sql ✓ ажилласан
│       └── 004_create_fact_civil.sql    ✗ type mismatch алдаа
└── frontend/
    └── app/
        ├── layout.tsx          ← title="Arav"
        ├── page.tsx            ← /dashboard руу redirect
        ├── globals.css
        ├── lib/
        │   └── api.ts          ← fetch utility, JWT, Civil interface
        ├── login/
        │   └── page.tsx        ← Dark/neon green дизайн, мобайл-first
        ├── dashboard/
        │   └── layout.tsx      ← Auth шалгана, nav, logout
        └── preview/            ← устгаж болно (template туршилт)
            ├── 1/page.tsx
            └── 2/page.tsx
```

## Хийгдсэн
- [x] Backend: Express + JWT auth + civil CRUD + search
- [x] Database: sec_role, sec_user, sec_user_role migration-ууд ажилласан
- [x] Frontend: API utility (`app/lib/api.ts`)
- [x] Frontend: Login page — dark background, neon lime (#a3ff50), grid pattern, мобайл-first, desktop дээр 320px centered card
- [x] Frontend: Dashboard layout (auth шалгана, nav, logout)
- [x] Git: https://github.com/AProgr/Arav

## Хийгдээгүй (дараагийн session-д эхлэх)
- [ ] `004_create_fact_civil.sql` — `user_id NUMERIC(9)` → `INTEGER` болгож засах (foreign key type mismatch)
- [ ] fact_civil migration ажиллуулах
- [ ] `app/dashboard/page.tsx` — Dashboard нүүр (welcome / статистик)
- [ ] `app/dashboard/civil/page.tsx` — Жагсаалт + хайлт
- [ ] `app/dashboard/civil/new/page.tsx` — Шинэ бүртгэл form
- [ ] `app/dashboard/civil/[id]/edit/page.tsx` — Засах form
- [ ] `app/preview/` хавтсыг устгах
- [ ] CLAUDE.md шинэчлэх

## API endpoints
```
POST  /api/auth/login             → { token, user_id, username, roles }
POST  /api/auth/register          → { user_id, username }
GET   /api/civil                  → [Civil] (auth)
GET   /api/civil/search?q=...     → [Civil] (auth)
GET   /api/civil/:id              → Civil (auth)
POST  /api/civil                  → Civil (auth)
PUT   /api/civil/:id              → Civil (auth)
PATCH /api/civil/:id/deactivate   → (auth)
```

## Дизайн шийдвэрүүд
- Login: Dribbble dark/neon green template-аас сонгосон
- Leader нар мобайлаас → login мобайл-first
- Admin нар PC-ээс → dashboard desktop-oriented
- Нэвтрэх нэрийн талбар: username (email биш)
