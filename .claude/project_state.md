---
name: Arav project current state
description: Arav системийн одоогийн явц, хийгдсэн болон хийгдээгүй зүйлс
type: project
originSessionId: cb3b91ad-8982-446d-9070-ed5f956faf7a
---
Мэдээлэл оруулах, хайх, тайлан гаргах систем. Иргэний (fact_civil) бүртгэлийн систем — 10/100/1000-ын дарга нар мобайлаас, adminууд PC-ээс ашиглана.

**Why:** Иргэдийн мэдээллийг hierarchy (арван→зуун→мянгат) бүтцээр бүртгэх, хайх, тайлан гаргах систем.

**How to apply:** Frontend нь mobile-first (login page), dashboard нь desktop-oriented байх ёстой.

## Tech stack
- Frontend: Next.js 16.2.4 + Tailwind v4 — `d:/my app/Arav/frontend/` (port 3000)
- Backend: Node.js + Express — `d:/my app/Arav/backend/` (port 3001)
- Database: PostgreSQL 16 (Docker container: arav_db, port 5432)
- DB creds: host=localhost, db=arav, user=arav_user, pass=arav_pass

## Server эхлүүлэх команд
- Backend: `cd "d:/my app/Arav/backend" && /c/Program\ Files/nodejs/node.exe src/index.js`
- Frontend: `cd "d:/my app/Arav/frontend" && /c/Program\ Files/nodejs/node.exe node_modules/next/dist/bin/next dev --port 3000`
- DB: docker container `arav_db` — аль хэдийн ажиллаж байна (docker start arav_db)

## Хийгдсэн зүйлс
- [x] Backend: Express сервер, JWT auth, `/api/auth/login`, `/api/auth/register`
- [x] Backend: `/api/civil` CRUD + search endpoints
- [x] Database: sec_role, sec_user, sec_user_role, migration файлууд бэлэн
- [x] Database: fact_civil migration бэлэн (гэхдээ type mismatch алдаатай — user_id NUMERIC vs INTEGER)
- [x] Frontend: `app/lib/api.ts` — API utility (JWT + fetch)
- [x] Frontend: `app/login/page.tsx` — Dark theme, neon green, мобайл-first дизайн (Dribbble-аас сонгосон)
- [x] Frontend: `app/dashboard/layout.tsx` — Auth шалгадаг layout
- [x] Frontend: `app/page.tsx` — /dashboard руу redirect
- [x] Test хэрэглэгч: username=admin, password=admin123

## Хийгдээгүй (дараагийн session)
- [ ] fact_civil migration-ийн type mismatch засах (user_id: NUMERIC → INTEGER)
- [ ] fact_civil migration ажиллуулах
- [ ] `app/dashboard/page.tsx` — Dashboard нүүр хуудас
- [ ] `app/dashboard/civil/page.tsx` — Жагсаалт + хайлт
- [ ] `app/dashboard/civil/new/page.tsx` — Шинэ бүртгэл form
- [ ] `app/dashboard/civil/[id]/edit/page.tsx` — Засах form
- [ ] Preview хуудсуудыг (`/preview/1`, `/preview/2`) устгах

## Тэмдэглэл
- Node.js нь PATH-д байхгүй, бүтэн замаар дуудах: `/c/Program Files/nodejs/node.exe`
- Next.js `.bin/next` Windows дээр ажиллахгүй, `node_modules/next/dist/bin/next` ашиглах
- `database/migrate.js` дотор `pg` module байхгүй — backend-аас ажиллуулах хэрэгтэй
