CREATE TABLE IF NOT EXISTS sec_user_role (
  user_role_id          SERIAL       PRIMARY KEY,
  user_role_code        VARCHAR(50),
  user_role_name        VARCHAR(200),
  user_role_desc        TEXT,
  user_id               INTEGER      NOT NULL REFERENCES sec_user(user_id),
  role_id               INTEGER      NOT NULL REFERENCES sec_role(role_id),
  effective_start_date  DATE         NOT NULL,
  effective_end_date    DATE,
  effective_last_change CHAR(1)      NOT NULL DEFAULT 'Y' CHECK (effective_last_change IN ('Y','N')),
  created_date          TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_by            VARCHAR(100) NOT NULL,
  updated_date          TIMESTAMP,
  updated_by            VARCHAR(100),
  status                CHAR(1)      NOT NULL DEFAULT 'A' CHECK (status IN ('A','I'))
);

COMMENT ON TABLE sec_user_role IS 'Хэрэглэгч болон эрхийн холбоос — нэг хэрэглэгч олон эрхтэй байж болно';

COMMENT ON COLUMN sec_user_role.user_role_id          IS 'Холбоосын давтагдашгүй дугаар';
COMMENT ON COLUMN sec_user_role.user_role_code        IS 'Холбоосын код';
COMMENT ON COLUMN sec_user_role.user_role_name        IS 'Холбоосын нэр';
COMMENT ON COLUMN sec_user_role.user_role_desc        IS 'Холбоосын тайлбар';
COMMENT ON COLUMN sec_user_role.user_id               IS 'Хэрэглэгчийн дугаар, sec_user хүснэгтэд холбогдоно';
COMMENT ON COLUMN sec_user_role.role_id               IS 'Эрхийн дугаар, sec_role хүснэгтэд холбогдоно';
COMMENT ON COLUMN sec_user_role.effective_start_date  IS 'Хүчинтэй болох огноо';
COMMENT ON COLUMN sec_user_role.effective_end_date    IS 'Хүчинтэй дуусах огноо, NULL = одоо идэвхтэй';
COMMENT ON COLUMN sec_user_role.effective_last_change IS 'Хамгийн сүүлийн өөрчлөлт эсэх: Y=тийм, N=үгүй';
COMMENT ON COLUMN sec_user_role.created_date          IS 'Үүсгэсэн огноо';
COMMENT ON COLUMN sec_user_role.created_by            IS 'Үүсгэсэн хэрэглэгч';
COMMENT ON COLUMN sec_user_role.updated_date          IS 'Өөрчилсөн огноо';
COMMENT ON COLUMN sec_user_role.updated_by            IS 'Өөрчилсөн хэрэглэгч';
COMMENT ON COLUMN sec_user_role.status                IS 'Төлөв: A=идэвхтэй, I=идэвхгүй';
