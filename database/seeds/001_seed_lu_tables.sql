-- ============================================================
-- lu_ лавлах хүснэгтүүдийн анхны өгөгдөл (Монголын нөхцөлд тохируулсан)
-- Дахин ажиллуулж болно: ON CONFLICT (<code>) DO NOTHING
-- ============================================================

-- 1. Үндэс угсаа
INSERT INTO lu_ethnicity (ethnicity_code, ethnicity_name, sort_order) VALUES
  ('KHALKH','Халх',1),('KAZAKH','Казах',2),('DURVUD','Дөрвөд',3),('BAYAD','Баяд',4),
  ('BURIAD','Буриад',5),('DARIGANGA','Дарьганга',6),('URIANKHAI','Урианхай',7),('ZAKHCHIN','Захчин',8),
  ('OOLD','Өөлд',9),('TORGUUD','Торгууд',10),('KHOTON','Хотон',11),('MYANGAD','Мянгад',12),
  ('BARGA','Барга',13),('UZEMCHIN','Үзэмчин',14),('TUVA','Тува',15),('OTHER','Бусад',99)
ON CONFLICT (ethnicity_code) DO NOTHING;

-- 2. Иргэншил / харьяалал
INSERT INTO lu_nationality (nationality_code, nationality_name, sort_order) VALUES
  ('MN','Монгол Улсын иргэн',1),('FRGN','Гадаадын иргэн',2),('STLS','Харьяалалгүй',3)
ON CONFLICT (nationality_code) DO NOTHING;

-- 3. Гэр бүлийн байдал
INSERT INTO lu_marital_status (marital_status_code, marital_status_name, sort_order) VALUES
  ('SINGLE','Ганц бие',1),('MARRIED','Гэрлэсэн',2),('COHAB','Хамтран амьдрагч',3),
  ('DIVORCED','Салсан',4),('WIDOWED','Бэлэвсэн',5)
ON CONFLICT (marital_status_code) DO NOTHING;

-- 4. Аймаг / нийслэл (21 аймаг + Улаанбаатар)
INSERT INTO lu_aimag_city (aimag_city_code, aimag_city_name, sort_order) VALUES
  ('AR','Архангай',1),('BO','Баян-Өлгий',2),('BH','Баянхонгор',3),('BU','Булган',4),
  ('GA','Говь-Алтай',5),('GS','Говьсүмбэр',6),('DA','Дархан-Уул',7),('DG','Дорноговь',8),
  ('DO','Дорнод',9),('DD','Дундговь',10),('ZA','Завхан',11),('OR','Орхон',12),
  ('OV','Өвөрхангай',13),('OM','Өмнөговь',14),('SU','Сүхбаатар',15),('SE','Сэлэнгэ',16),
  ('TO','Төв',17),('UV','Увс',18),('HO','Ховд',19),('HU','Хөвсгөл',20),
  ('HE','Хэнтий',21),('UB','Улаанбаатар',22)
ON CONFLICT (aimag_city_code) DO NOTHING;

-- 5. Сум / дүүрэг (жишээ: Улаанбаатарын 9 дүүрэг, parent_code = UB)
INSERT INTO lu_soum_district (soum_district_code, soum_district_name, parent_code, sort_order) VALUES
  ('UB-BGN','Багануур',      'UB',1),('UB-BGH','Багахангай',  'UB',2),
  ('UB-BGL','Баянгол',       'UB',3),('UB-BZH','Баянзүрх',    'UB',4),
  ('UB-NAL','Налайх',        'UB',5),('UB-SBD','Сонгинохайрхан','UB',6),
  ('UB-SBR','Сүхбаатар',     'UB',7),('UB-KHU','Хан-Уул',     'UB',8),
  ('UB-CHD','Чингэлтэй',     'UB',9)
ON CONFLICT (soum_district_code) DO NOTHING;

-- 6. Баг / хороо (жишээ: Баянгол дүүргийн эхний 5 хороо, parent_code = UB-BGL)
INSERT INTO lu_bag_khoroo (bag_khoroo_code, bag_khoroo_name, parent_code, sort_order) VALUES
  ('UB-BGL-01','1-р хороо','UB-BGL',1),('UB-BGL-02','2-р хороо','UB-BGL',2),
  ('UB-BGL-03','3-р хороо','UB-BGL',3),('UB-BGL-04','4-р хороо','UB-BGL',4),
  ('UB-BGL-05','5-р хороо','UB-BGL',5)
ON CONFLICT (bag_khoroo_code) DO NOTHING;

-- 7. Төрсөн газар (аймаг/нийслэлийн жагсаалттай ижил)
INSERT INTO lu_birth_place (birth_place_code, birth_place_name, sort_order) VALUES
  ('AR','Архангай',1),('BO','Баян-Өлгий',2),('BH','Баянхонгор',3),('BU','Булган',4),
  ('GA','Говь-Алтай',5),('GS','Говьсүмбэр',6),('DA','Дархан-Уул',7),('DG','Дорноговь',8),
  ('DO','Дорнод',9),('DD','Дундговь',10),('ZA','Завхан',11),('OR','Орхон',12),
  ('OV','Өвөрхангай',13),('OM','Өмнөговь',14),('SU','Сүхбаатар',15),('SE','Сэлэнгэ',16),
  ('TO','Төв',17),('UV','Увс',18),('HO','Ховд',19),('HU','Хөвсгөл',20),
  ('HE','Хэнтий',21),('UB','Улаанбаатар',22),('FRGN','Гадаад улс',99)
ON CONFLICT (birth_place_code) DO NOTHING;

-- 8. Боловсролын зэрэг
INSERT INTO lu_edu_level (edu_level_code, edu_level_name, sort_order) VALUES
  ('NONE','Боловсролгүй',1),('PRIMARY','Бага',2),('BASIC','Суурь',3),
  ('SECONDARY','Бүрэн дунд',4),('VOCATIONAL','Тусгай мэргэжлийн дунд',5),
  ('DIPLOMA','Дипломын дээд',6),('BACHELOR','Бакалавр',7),('MASTER','Магистр',8),
  ('DOCTOR','Доктор (Ph.D)',9)
ON CONFLICT (edu_level_code) DO NOTHING;

-- 9. Мэргэжил (түгээмэл)
INSERT INTO lu_edu_profession (edu_profession_code, edu_profession_name, sort_order) VALUES
  ('TEACHER','Багш',1),('DOCTOR','Эмч',2),('NURSE','Сувилагч',3),('ENGINEER','Инженер',4),
  ('SW_ENG','Программ хангамжийн инженер',5),('LAWYER','Хуульч',6),('ACCOUNTANT','Нягтлан бодогч',7),
  ('ECONOMIST','Эдийн засагч',8),('DRIVER','Жолооч',9),('BUILDER','Барилгачин',10),
  ('ELECTRICIAN','Цахилгаанчин',11),('COOK','Тогооч',12),('FARMER','Малчин/тариаланч',13),
  ('SALES','Худалдагч',14),('OTHER','Бусад',99)
ON CONFLICT (edu_profession_code) DO NOTHING;

-- 10. Байгууллага (салбар/төрлөөр)
INSERT INTO lu_org (org_code, org_name, sort_order) VALUES
  ('GOV','Төрийн байгууллага',1),('PRIVATE','Хувийн хэвшил',2),('NGO','Төрийн бус байгууллага',3),
  ('INTL','Олон улсын байгууллага',4),('EDU','Боловсролын байгууллага',5),
  ('HEALTH','Эрүүл мэндийн байгууллага',6),('SELF','Хувиараа хөдөлмөр эрхлэгч',7),('OTHER','Бусад',99)
ON CONFLICT (org_code) DO NOTHING;

-- 11. Албан тушаал
INSERT INTO lu_emp_position (emp_position_code, emp_position_name, sort_order) VALUES
  ('DIRECTOR','Захирал',1),('DEPUTY','Дэд захирал',2),('DEPT_HEAD','Хэлтсийн дарга',3),
  ('MANAGER','Менежер',4),('SR_SPEC','Ахлах мэргэжилтэн',5),('SPECIALIST','Мэргэжилтэн',6),
  ('STAFF','Ажилтан',7),('ASSISTANT','Туслах ажилтан',8),('INTERN','Дадлагажигч',9)
ON CONFLICT (emp_position_code) DO NOTHING;

-- 12. Нийгмийн байдал
INSERT INTO lu_social_status (social_status_code, social_status_name, sort_order) VALUES
  ('EMPLOYED','Ажилтай',1),('UNEMPLOYED','Ажилгүй',2),('STUDENT','Оюутан',3),('PUPIL','Сурагч',4),
  ('RETIRED','Тэтгэвэрт',5),('SELFEMP','Хувиараа хөдөлмөр эрхлэгч',6),('HOMEMAKER','Гэрийн эзэгтэй',7),
  ('DISABLED','Хөгжлийн бэрхшээлтэй',8)
ON CONFLICT (social_status_code) DO NOTHING;

-- 13. Хөгжлийн бэрхшээл
INSERT INTO lu_disability (disability_code, disability_name, sort_order) VALUES
  ('NONE','Байхгүй',1),('VISION','Хараа',2),('HEARING','Сонсгол',3),('SPEECH','Хэл яриа',4),
  ('MOBILITY','Хөдлөх эрхтэн',5),('INTELLECT','Оюун ухаан',6),('MENTAL','Сэтгэц',7),('MULTIPLE','Олон төрлийн',8)
ON CONFLICT (disability_code) DO NOTHING;

-- 14. Цэргийн алба
INSERT INTO lu_military_status (military_status_code, military_status_name, sort_order) VALUES
  ('SERVED','Хаасан',1),('NOTSERVED','Хаагаагүй',2),('ACTIVE','Хугацаат албанд байгаа',3),
  ('EXEMPT','Чөлөөлөгдсөн',4),('DEFERRED','Тэнсэгдсэн',5),('NA','Хамаарахгүй',9)
ON CONFLICT (military_status_code) DO NOTHING;

-- 15. Орлогын түвшин (сарын, ₮)
INSERT INTO lu_income_level (income_level_code, income_level_name, sort_order) VALUES
  ('NONE','Орлогогүй',1),('LOW','Бага (< 500,000₮)',2),('MID','Дунд (500,000 – 1,500,000₮)',3),
  ('UPPER','Дээд дунд (1,500,000 – 3,000,000₮)',4),('HIGH','Өндөр (> 3,000,000₮)',5)
ON CONFLICT (income_level_code) DO NOTHING;

-- 16. Ахлагчийн төрөл
INSERT INTO lu_leader_type (leader_type_code, leader_type_name, sort_order) VALUES
  ('10','Арвангийн дарга',1),('100','Зуунгийн дарга',2),('1000','Мянгатын дарга',3)
ON CONFLICT (leader_type_code) DO NOTHING;
