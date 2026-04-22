CREATE TABLE IF NOT EXISTS sec_role (
  role_id               SERIAL       PRIMARY KEY,
  role_code             VARCHAR(50),
  role_name             VARCHAR(200),
  role_desc             TEXT,
  effective_start_date  DATE         NOT NULL,
  effective_end_date    DATE,
  effective_last_change CHAR(1)      NOT NULL DEFAULT 'Y' CHECK (effective_last_change IN ('Y','N')),
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL,
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);

COMMENT ON TABLE sec_role IS 'Хэрэглэгчийн эрхийн бүртгэл';

COMMENT ON COLUMN sec_role.role_id               IS 'Эрхийн давтагдашгүй дугаар';
COMMENT ON COLUMN sec_role.role_code             IS 'Эрхийн код';
COMMENT ON COLUMN sec_role.role_name             IS 'Эрхийн нэр';
COMMENT ON COLUMN sec_role.role_desc             IS 'Эрхийн тайлбар';
COMMENT ON COLUMN sec_role.effective_start_date  IS 'Хүчинтэй болох огноо';
COMMENT ON COLUMN sec_role.effective_end_date    IS 'Хүчинтэй дуусах огноо, NULL = одоо идэвхтэй';
COMMENT ON COLUMN sec_role.effective_last_change IS 'Хамгийн сүүлийн өөрчлөлт эсэх: Y=тийм, N=үгүй';
COMMENT ON COLUMN sec_role.created_date          IS 'Үүсгэсэн огноо';
COMMENT ON COLUMN sec_role.created_by            IS 'Үүсгэсэн хэрэглэгч';
COMMENT ON COLUMN sec_role.updated_date          IS 'Өөрчилсөн огноо';
COMMENT ON COLUMN sec_role.updated_by            IS 'Өөрчилсөн хэрэглэгч';
COMMENT ON COLUMN sec_role.status                IS 'Төлөв: A=идэвхтэй, I=идэвхгүй';
