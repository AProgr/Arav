CREATE TABLE IF NOT EXISTS fact_civil (
  civil_id                SERIAL        PRIMARY KEY,
  civil_code              VARCHAR(50),
  civil_name              VARCHAR(200),
  civil_desc              TEXT,

  user_id                 INTEGER       NOT NULL REFERENCES sec_user(user_id),
  parent_civil_id         INTEGER       REFERENCES fact_civil(civil_id),

  forename                VARCHAR(100),
  last_name               VARCHAR(100)  NOT NULL,
  first_name              VARCHAR(100)  NOT NULL,
  gender                  CHAR(1)       NOT NULL CHECK (gender IN ('M','F')),
  date_of_birth           DATE          NOT NULL,
  register_num            VARCHAR(20)   UNIQUE,
  registered_num          VARCHAR(50),
  phone                   VARCHAR(20),
  email                   VARCHAR(200),
  secondary_phone         VARCHAR(20),
  emergency_phone         VARCHAR(20),

  id_card_num             VARCHAR(20),
  blood_type              VARCHAR(5),
  ethnicity_code          VARCHAR(50),
  nationality_code        VARCHAR(50),
  birth_place_code        VARCHAR(50),
  marital_status_code     VARCHAR(50),
  photo_url               TEXT,

  father_name             VARCHAR(100),
  mother_name             VARCHAR(100),
  spouse_name             VARCHAR(100),
  children_count          SMALLINT,

  addr_territories_id     NUMERIC(9),
  addr_aimag_city_code    VARCHAR(50),
  addr_soum_district_code VARCHAR(50),
  addr_bag_khorro_code    VARCHAR(50),
  addr_region_id          NUMERIC(9),
  addr_street_id          NUMERIC(9),
  addr_apartment_id       NUMERIC(9),
  addr_town_id            NUMERIC(9),
  addr_detail             TEXT,

  edu_level_code          VARCHAR(50),
  edu_profession_code     VARCHAR(50),
  org_code                VARCHAR(50),
  emp_position_code       VARCHAR(50),
  social_status_code      VARCHAR(50),
  disability_code         VARCHAR(50),
  military_status_code    VARCHAR(50),
  income_level_code       VARCHAR(50),

  is_leaf                 CHAR(1)       DEFAULT 'Y' CHECK (is_leaf IN ('Y','N')),
  leader_code             VARCHAR(20),

  effective_start_date    DATE          NOT NULL,
  effective_end_date      DATE,
  effective_last_change   CHAR(1)       NOT NULL DEFAULT 'Y' CHECK (effective_last_change IN ('Y','N')),
  created_date            TIMESTAMP     NOT NULL DEFAULT NOW(),
  created_by              VARCHAR(100)  NOT NULL,
  updated_date            TIMESTAMP,
  updated_by              VARCHAR(100),
  status                  CHAR(1)       NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);

COMMENT ON TABLE fact_civil IS 'Иргэний дэлгэрэнгүй мэдээллийн бүртгэл';

COMMENT ON COLUMN fact_civil.civil_id                IS 'Иргэний бүртгэлийн давтагдашгүй дугаар';
COMMENT ON COLUMN fact_civil.civil_code              IS 'Иргэний бүртгэлийн код';
COMMENT ON COLUMN fact_civil.civil_name              IS 'Иргэний бүртгэлийн нэр';
COMMENT ON COLUMN fact_civil.civil_desc              IS 'Иргэний бүртгэлийн тайлбар';
COMMENT ON COLUMN fact_civil.user_id                 IS 'Холбогдох хэрэглэгчийн дугаар, sec_user хүснэгтэд холбогдоно';
COMMENT ON COLUMN fact_civil.parent_civil_id         IS 'Дээд шатны ахлагчийн civil_id — гишүүн→арвангийн ахлагч→зуунгийн ахлагч→мянгатын ахлагч';
COMMENT ON COLUMN fact_civil.forename                IS 'Ургийн овог';
COMMENT ON COLUMN fact_civil.last_name               IS 'Овог (эцэг/эхийн нэр)';
COMMENT ON COLUMN fact_civil.first_name              IS 'Нэр';
COMMENT ON COLUMN fact_civil.gender                  IS 'Хүйс: M=эрэгтэй, F=эмэгтэй';
COMMENT ON COLUMN fact_civil.date_of_birth           IS 'Төрсөн огноо';
COMMENT ON COLUMN fact_civil.register_num            IS 'Үндэсний регистрийн дугаар';
COMMENT ON COLUMN fact_civil.registered_num          IS 'Системийн бүртгэлийн дугаар (арван/зуун дахь гишүүний дугаар)';
COMMENT ON COLUMN fact_civil.phone                   IS 'Утасны дугаар';
COMMENT ON COLUMN fact_civil.email                   IS 'Цахим шуудангийн хаяг';
COMMENT ON COLUMN fact_civil.secondary_phone         IS 'Нэмэлт утасны дугаар';
COMMENT ON COLUMN fact_civil.emergency_phone         IS 'Яаралтай үед холбогдох утас';
COMMENT ON COLUMN fact_civil.id_card_num             IS 'Иргэний үнэмлэхний дугаар';
COMMENT ON COLUMN fact_civil.blood_type              IS 'Цусны бүлэг';
COMMENT ON COLUMN fact_civil.ethnicity_code          IS 'Үндэс угсааны код (Халх, Казах, Буриад…)';
COMMENT ON COLUMN fact_civil.nationality_code        IS 'Иргэншил / харьяаллын код (Монгол / гадаад)';
COMMENT ON COLUMN fact_civil.birth_place_code        IS 'Төрсөн газрын код (аймаг/сум)';
COMMENT ON COLUMN fact_civil.marital_status_code     IS 'Гэр бүлийн байдлын код (гэрлэсэн/ганц бие/салсан/бэлэвсэн)';
COMMENT ON COLUMN fact_civil.photo_url               IS 'Хувийн зургийн зам/URL';
COMMENT ON COLUMN fact_civil.father_name             IS 'Эцгийн нэр';
COMMENT ON COLUMN fact_civil.mother_name             IS 'Эхийн нэр';
COMMENT ON COLUMN fact_civil.spouse_name             IS 'Гэр бүлийн хамтрагчийн нэр';
COMMENT ON COLUMN fact_civil.children_count          IS 'Хүүхдийн тоо';
COMMENT ON COLUMN fact_civil.addr_territories_id     IS 'Нутаг дэвсгэрийн ID';
COMMENT ON COLUMN fact_civil.addr_aimag_city_code    IS 'Аймаг/нийслэлийн код';
COMMENT ON COLUMN fact_civil.addr_soum_district_code IS 'Сум/дүүргийн код';
COMMENT ON COLUMN fact_civil.addr_bag_khorro_code    IS 'Баг/хорооны код';
COMMENT ON COLUMN fact_civil.addr_region_id          IS 'Бүс нутгийн ID';
COMMENT ON COLUMN fact_civil.addr_street_id          IS 'Гудамжны ID';
COMMENT ON COLUMN fact_civil.addr_apartment_id       IS 'Байрны ID';
COMMENT ON COLUMN fact_civil.addr_town_id            IS 'Суурины ID';
COMMENT ON COLUMN fact_civil.addr_detail             IS 'Дэлгэрэнгүй хаяг';
COMMENT ON COLUMN fact_civil.edu_level_code          IS 'Боловсролын зэргийн код (сүүлийн байдал)';
COMMENT ON COLUMN fact_civil.edu_profession_code     IS 'Мэргэжлийн код (сүүлийн байдал)';
COMMENT ON COLUMN fact_civil.org_code                IS 'Ажил олгогч байгууллагын код (сүүлийн байдал)';
COMMENT ON COLUMN fact_civil.emp_position_code       IS 'Албан тушаалын код (сүүлийн байдал)';
COMMENT ON COLUMN fact_civil.social_status_code      IS 'Нийгмийн байдлын код (ажилтай/ажилгүй/оюутан/тэтгэвэрт)';
COMMENT ON COLUMN fact_civil.disability_code         IS 'Хөгжлийн бэрхшээлийн код (эсэх/төрөл)';
COMMENT ON COLUMN fact_civil.military_status_code    IS 'Цэргийн албаны код (хассан/хаагаагүй/чөлөөлөгдсөн)';
COMMENT ON COLUMN fact_civil.income_level_code       IS 'Орлогын түвшний код';
COMMENT ON COLUMN fact_civil.is_leaf                 IS 'Навч эсэх: Y=доороо гишүүнгүй, N=доороо гишүүнтэй';
COMMENT ON COLUMN fact_civil.leader_code             IS 'Ахлагчийн төрөл: 10=арвангийн, 100=зуунгийн, 1000=мянгатын ахлагч, NULL=ахлагч биш';
COMMENT ON COLUMN fact_civil.effective_start_date    IS 'Хүчинтэй болох огноо';
COMMENT ON COLUMN fact_civil.effective_end_date      IS 'Хүчинтэй дуусах огноо, NULL = одоо идэвхтэй';
COMMENT ON COLUMN fact_civil.effective_last_change   IS 'Хамгийн сүүлийн өөрчлөлт эсэх: Y=тийм, N=үгүй';
COMMENT ON COLUMN fact_civil.created_date            IS 'Үүсгэсэн огноо';
COMMENT ON COLUMN fact_civil.created_by              IS 'Үүсгэсэн хэрэглэгч';
COMMENT ON COLUMN fact_civil.updated_date            IS 'Өөрчилсөн огноо';
COMMENT ON COLUMN fact_civil.updated_by              IS 'Өөрчилсөн хэрэглэгч';
COMMENT ON COLUMN fact_civil.status                  IS 'Төлөв: A=идэвхтэй, I=идэвхгүй';
