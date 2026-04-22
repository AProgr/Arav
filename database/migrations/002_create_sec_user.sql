CREATE TABLE IF NOT EXISTS sec_user (
  user_id               SERIAL       PRIMARY KEY,
  user_code             VARCHAR(50),
  user_name             VARCHAR(200),
  user_desc             TEXT,
  username              VARCHAR(100) NOT NULL UNIQUE,
  password_hash         VARCHAR(255) NOT NULL,
  effective_start_date  DATE         NOT NULL,
  effective_end_date    DATE,
  effective_last_change CHAR(1)      NOT NULL DEFAULT 'Y' CHECK (effective_last_change IN ('Y','N')),
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL,
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);

COMMENT ON TABLE sec_user IS 'Системийн хэрэглэгчийн бүртгэл';

COMMENT ON COLUMN sec_user.user_id               IS 'Хэрэглэгчийн давтагдашгүй дугаар';
COMMENT ON COLUMN sec_user.user_code             IS 'Хэрэглэгчийн код';
COMMENT ON COLUMN sec_user.user_name             IS 'Хэрэглэгчийн нэр';
COMMENT ON COLUMN sec_user.user_desc             IS 'Хэрэглэгчийн тайлбар';
COMMENT ON COLUMN sec_user.username              IS 'Нэвтрэх нэр';
COMMENT ON COLUMN sec_user.password_hash         IS 'Нууц үгийн hash';
COMMENT ON COLUMN sec_user.effective_start_date  IS 'Хүчинтэй болох огноо';
COMMENT ON COLUMN sec_user.effective_end_date    IS 'Хүчинтэй дуусах огноо, NULL = одоо идэвхтэй';
COMMENT ON COLUMN sec_user.effective_last_change IS 'Хамгийн сүүлийн өөрчлөлт эсэх: Y=тийм, N=үгүй';
COMMENT ON COLUMN sec_user.created_date          IS 'Үүсгэсэн огноо';
COMMENT ON COLUMN sec_user.created_by            IS 'Үүсгэсэн хэрэглэгч';
COMMENT ON COLUMN sec_user.updated_date          IS 'Өөрчилсөн огноо';
COMMENT ON COLUMN sec_user.updated_by            IS 'Өөрчилсөн хэрэглэгч';
COMMENT ON COLUMN sec_user.status                IS 'Төлөв: A=идэвхтэй, I=идэвхгүй';
