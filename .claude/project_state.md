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
        │   ├── layout.tsx      ← Auth шалгана, nav, logout
        │   └── page.tsx        ← Dashboard нүүр (welcome + статистик)
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
- [x] Frontend: Dashboard нүүр хуудас (`app/dashboard/page.tsx`) — welcome + статистик картууд
- [x] Frontend: `api.ts` — `NEXT_PUBLIC_API_URL` env var-аар backend хаяг тохируулах боломжтой (fallback `localhost:3001/api`)
- [x] Database: `004_create_fact_civil.sql` — type mismatch засагдсан (INTEGER FK), forename нэмсэн, profession→edu_profession_code, 17 хувийн талбар нэмсэн (55 багана), migration ажилласан
- [x] Database: 16 lu_ лавлах хүснэгт (`005_create_lu_tables.sql`) + анхны өгөгдөл (`seeds/001_seed_lu_tables.sql`, 154 мөр Монголын нөхцөлд)
- [x] Backend: `/api/lookup/:name` lookup API (16 lu_ хүснэгт, `?parent=` шаталсан шүүлт), civilController шинэ schema-д тааруулсан
- [x] Frontend: `app/dashboard/civil/new/page.tsx` — бүртгэлийн форм (7 хэсэг, 12 dropdown, шаталсан хаяг), `api.ts`-д lookup + шинэ Civil interface
- [x] Git: https://github.com/AProgr/Arav

## Хийгдээгүй (дараагийн session-д эхлэх)
- [ ] `app/dashboard/civil/page.tsx` — Жагсаалт + хайлт (nav дахь "Иргэний бүртгэл" одоо 404, энэ засна)
- [ ] `app/dashboard/civil/[id]/edit/page.tsx` — Засах form (backend update бэлэн)
- [ ] fact_civil._code → lu_ хүснэгтүүд рүү FK холбоо нэмэх (сонголт)
- [ ] lu_ хүснэгтүүдийг бүрэн жагсаалтаар дүүргэх (330+ сум, олон мянган хороо — одоо зөвхөн жишээ)
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
GET   /api/lookup                 → [name] (auth) — боломжтой лавлахуудын нэрс
GET   /api/lookup/:name           → [{code,name,parent_code}] (auth)
GET   /api/lookup/:name?parent=XX → шаталсан шүүлт (сум←аймаг, хороо←сум)
```

## Өгөгдлийн загвар — lu_ лавлах хүснэгтүүд
16 lu_ хүснэгт: ethnicity, nationality, birth_place, marital_status, aimag_city,
soum_district, bag_khoroo, edu_level, edu_profession, org, emp_position,
social_status, disability, military_status, income_level, leader_type.
- Бүтэц: `<нэр>_id/_code/_name/_desc`, `parent_code` (шаталсан), `sort_order`, audit, status
- `fact_civil.<x>_code` → `lu_<x>.<x>_code` (одоо FK биш, зөвхөн логик холбоо)
- Кирилл: Git Bash `curl -d` payload эвддэг — UTF-8 файлаас `curl --data @file`. Браузер fetch зөв.

## Нийтэд түр байрлуулах (demo) — cloudflared
Бусдад интернэтээр түр харуулахдаа Cloudflare quick tunnel ашигласан (бүртгэлгүй, үнэгүй):
```bash
# cloudflared.exe татах: github.com/cloudflare/cloudflared/releases → cloudflared-windows-amd64.exe
cloudflared.exe tunnel --url http://localhost:3000   # frontend → https://xxx.trycloudflare.com
cloudflared.exe tunnel --url http://localhost:3001   # backend  → https://yyy.trycloudflare.com
```
Бусад хүн login хийж чадахын тулд:
1. Backend-д тусад нь tunnel гаргах (`localhost:3001`)
2. `frontend/.env.local` дотор `NEXT_PUBLIC_API_URL=https://yyy.trycloudflare.com/api` (энэ файл gitignore-д, git-д ордоггүй)
3. `next.config.ts` → `allowedDevOrigins: ['xxx.trycloudflare.com']` (Next.js 16 dev режимд шаардана)
4. `.env.local`/`next.config.ts` өөрчилсний дараа frontend-ийг **restart** хийх (`NEXT_PUBLIC_*`-ийг эхлэхдээ уншдаг)

> ⚠️ trycloudflare хаяг эхлүүлэх бүрт өөр болдог — ephemeral. PC + backend + frontend + 2 tunnel + Docker бүгд асаалттай байх ёстой.
> ⚠️ HTTPS хуудаснаас `http://localhost` руу хандахыг браузер mixed-content-оор хаадаг — тиймээс backend-ийг мөн HTTPS tunnel-аар гаргах шаардлагатай (эсвэл зөвхөн UI харуулбал frontend tunnel хангалттай).

### Оношилсон нэг зүйл (санамж)
Login "ажиллахгүй, алдаа өгөхгүй" гэж харагдвал — үнэндээ login АМЖИЛТТАЙ болоод `/dashboard` руу шилжсэн байж болно. Өмнө нь `app/dashboard/page.tsx` байгаагүй тул 404 гарч, эвдэрсэн мэт харагддаг байсан. Одоо энэ хуудсыг үүсгэсэн.

## Дизайн шийдвэрүүд
- Login: Dribbble dark/neon green template-аас сонгосон
- Leader нар мобайлаас → login мобайл-first
- Admin нар PC-ээс → dashboard desktop-oriented
- Нэвтрэх нэрийн талбар: username (email биш)
