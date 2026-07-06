-- ============================================================
-- Лавлах (lookup) хүснэгтүүд — fact_civil доторх _code талбар бүрийн сонголтын эх сурвалж
-- Нэрлэлт: lu_<нэр>. code = fact_civil дахь харгалзах _code утгатай тохирно.
-- parent_code = шаталсан лавлахад (аймаг→сум→баг) эцэг элементийн код.
-- ============================================================

-- 1. Үндэс угсаа (ethnicity_code)
CREATE TABLE IF NOT EXISTS lu_ethnicity (
  ethnicity_id          SERIAL       PRIMARY KEY,
  ethnicity_code        VARCHAR(50)  NOT NULL UNIQUE,
  ethnicity_name        VARCHAR(200) NOT NULL,
  ethnicity_desc        TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_ethnicity IS 'Лавлах: Үндэс угсаа (Халх, Казах, Буриад…)';

-- 2. Иргэншил / харьяалал (nationality_code)
CREATE TABLE IF NOT EXISTS lu_nationality (
  nationality_id        SERIAL       PRIMARY KEY,
  nationality_code      VARCHAR(50)  NOT NULL UNIQUE,
  nationality_name      VARCHAR(200) NOT NULL,
  nationality_desc      TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_nationality IS 'Лавлах: Иргэншил / харьяалал (Монгол / гадаад)';

-- 3. Төрсөн газар (birth_place_code)
CREATE TABLE IF NOT EXISTS lu_birth_place (
  birth_place_id        SERIAL       PRIMARY KEY,
  birth_place_code      VARCHAR(50)  NOT NULL UNIQUE,
  birth_place_name      VARCHAR(200) NOT NULL,
  birth_place_desc      TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_birth_place IS 'Лавлах: Төрсөн газар (аймаг/сум)';

-- 4. Гэр бүлийн байдал (marital_status_code)
CREATE TABLE IF NOT EXISTS lu_marital_status (
  marital_status_id     SERIAL       PRIMARY KEY,
  marital_status_code   VARCHAR(50)  NOT NULL UNIQUE,
  marital_status_name   VARCHAR(200) NOT NULL,
  marital_status_desc   TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_marital_status IS 'Лавлах: Гэр бүлийн байдал (гэрлэсэн/ганц бие/салсан/бэлэвсэн)';

-- 5. Аймаг / нийслэл (addr_aimag_city_code)
CREATE TABLE IF NOT EXISTS lu_aimag_city (
  aimag_city_id         SERIAL       PRIMARY KEY,
  aimag_city_code       VARCHAR(50)  NOT NULL UNIQUE,
  aimag_city_name       VARCHAR(200) NOT NULL,
  aimag_city_desc       TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_aimag_city IS 'Лавлах: Аймаг / нийслэл';

-- 6. Сум / дүүрэг (addr_soum_district_code) — parent_code = аймаг/нийслэлийн код
CREATE TABLE IF NOT EXISTS lu_soum_district (
  soum_district_id      SERIAL       PRIMARY KEY,
  soum_district_code    VARCHAR(50)  NOT NULL UNIQUE,
  soum_district_name    VARCHAR(200) NOT NULL,
  soum_district_desc    TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_soum_district IS 'Лавлах: Сум / дүүрэг (parent_code = аймаг/нийслэл)';

-- 7. Баг / хороо (addr_bag_khorro_code) — parent_code = сум/дүүргийн код
CREATE TABLE IF NOT EXISTS lu_bag_khoroo (
  bag_khoroo_id         SERIAL       PRIMARY KEY,
  bag_khoroo_code       VARCHAR(50)  NOT NULL UNIQUE,
  bag_khoroo_name       VARCHAR(200) NOT NULL,
  bag_khoroo_desc       TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_bag_khoroo IS 'Лавлах: Баг / хороо (parent_code = сум/дүүрэг)';

-- 8. Боловсролын зэрэг (edu_level_code)
CREATE TABLE IF NOT EXISTS lu_edu_level (
  edu_level_id          SERIAL       PRIMARY KEY,
  edu_level_code        VARCHAR(50)  NOT NULL UNIQUE,
  edu_level_name        VARCHAR(200) NOT NULL,
  edu_level_desc        TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_edu_level IS 'Лавлах: Боловсролын зэрэг';

-- 9. Мэргэжил (edu_profession_code)
CREATE TABLE IF NOT EXISTS lu_edu_profession (
  edu_profession_id     SERIAL       PRIMARY KEY,
  edu_profession_code   VARCHAR(50)  NOT NULL UNIQUE,
  edu_profession_name   VARCHAR(200) NOT NULL,
  edu_profession_desc   TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_edu_profession IS 'Лавлах: Мэргэжил';

-- 10. Байгууллага (org_code)
CREATE TABLE IF NOT EXISTS lu_org (
  org_id                SERIAL       PRIMARY KEY,
  org_code              VARCHAR(50)  NOT NULL UNIQUE,
  org_name              VARCHAR(200) NOT NULL,
  org_desc              TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_org IS 'Лавлах: Ажил олгогч байгууллага';

-- 11. Албан тушаал (emp_position_code)
CREATE TABLE IF NOT EXISTS lu_emp_position (
  emp_position_id       SERIAL       PRIMARY KEY,
  emp_position_code     VARCHAR(50)  NOT NULL UNIQUE,
  emp_position_name     VARCHAR(200) NOT NULL,
  emp_position_desc     TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_emp_position IS 'Лавлах: Албан тушаал';

-- 12. Нийгмийн байдал (social_status_code)
CREATE TABLE IF NOT EXISTS lu_social_status (
  social_status_id      SERIAL       PRIMARY KEY,
  social_status_code    VARCHAR(50)  NOT NULL UNIQUE,
  social_status_name    VARCHAR(200) NOT NULL,
  social_status_desc    TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_social_status IS 'Лавлах: Нийгмийн байдал (ажилтай/ажилгүй/оюутан/тэтгэвэрт)';

-- 13. Хөгжлийн бэрхшээл (disability_code)
CREATE TABLE IF NOT EXISTS lu_disability (
  disability_id         SERIAL       PRIMARY KEY,
  disability_code       VARCHAR(50)  NOT NULL UNIQUE,
  disability_name       VARCHAR(200) NOT NULL,
  disability_desc       TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_disability IS 'Лавлах: Хөгжлийн бэрхшээл (эсэх/төрөл)';

-- 14. Цэргийн алба (military_status_code)
CREATE TABLE IF NOT EXISTS lu_military_status (
  military_status_id    SERIAL       PRIMARY KEY,
  military_status_code  VARCHAR(50)  NOT NULL UNIQUE,
  military_status_name  VARCHAR(200) NOT NULL,
  military_status_desc  TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_military_status IS 'Лавлах: Цэргийн алба (хассан/хаагаагүй/чөлөөлөгдсөн)';

-- 15. Орлогын түвшин (income_level_code)
CREATE TABLE IF NOT EXISTS lu_income_level (
  income_level_id       SERIAL       PRIMARY KEY,
  income_level_code     VARCHAR(50)  NOT NULL UNIQUE,
  income_level_name     VARCHAR(200) NOT NULL,
  income_level_desc     TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_income_level IS 'Лавлах: Орлогын түвшин';

-- 16. Ахлагчийн төрөл (leader_code) — 10=арвангийн, 100=зуунгийн, 1000=мянгатын
CREATE TABLE IF NOT EXISTS lu_leader_type (
  leader_type_id        SERIAL       PRIMARY KEY,
  leader_type_code      VARCHAR(50)  NOT NULL UNIQUE,
  leader_type_name      VARCHAR(200) NOT NULL,
  leader_type_desc      TEXT,
  parent_code           VARCHAR(50),
  sort_order            SMALLINT,
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL DEFAULT 'system',
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);
COMMENT ON TABLE lu_leader_type IS 'Лавлах: Ахлагчийн төрөл (10=арвангийн, 100=зуунгийн, 1000=мянгатын)';
