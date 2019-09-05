CREATE TABLE "users" (
  "id" uuid UNIQUE NOT NULL,
  "full_name" varchar,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp,
  "deleted_at" timestamp
);


COMMENT ON COLUMN "users"."updated_at" IS 'When order updated';

COMMENT ON COLUMN "users"."deleted_at" IS 'When order deleted';

CREATE TABLE "cart_items" (
  "cart_id" uuid,
  "product_id" uuid,
  "quantity" int DEFAULT 1
);

CREATE TABLE "cart_ops" (
  "id" uuid UNIQUE NOT NULL,
  "type" varchar,
  "value" decimal
);

CREATE TABLE "cart" (
  "id" uuid UNIQUE NOT NULL,
  "user_id" uuid UNIQUE NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp,
  "deleted_at" timestamp
);

COMMENT ON COLUMN "cart"."updated_at" IS 'When order updated';

COMMENT ON COLUMN "cart"."deleted_at" IS 'When order deleted';

CREATE TABLE "products" (
  "id" uuid UNIQUE NOT NULL,
  "name" varchar,
  "price" int,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp,
  "deleted_at" timestamp
);

COMMENT ON COLUMN "products"."updated_at" IS 'When order updated';

COMMENT ON COLUMN "products"."deleted_at" IS 'When order deleted';

ALTER TABLE "cart_items" ADD FOREIGN KEY ("cart_id") REFERENCES "cart" ("id");

ALTER TABLE "cart_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "cart" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

INSERT INTO public.users(
	id, full_name)
	VALUES 
	('cee1fe16-7755-47cc-beeb-de7c2e7971ab', 'user a'),
	('e5316c5d-c82f-479f-a268-9bb80268675c', 'user b');

INSERT INTO public.cart(
	id, user_id)
	VALUES ('daa76a35-af45-4ec9-a307-59282d9fdba8','cee1fe16-7755-47cc-beeb-de7c2e7971ab');	

INSERT INTO public.products(
	id, name, price)
	VALUES ('9144413e-5743-4afe-b366-7ff765abd096', 'iPhone X', '950'),
		   ('56b6e5e8-7d7c-45e3-80b5-20d66a31da46', 'iPhone 8', '750'),
		   ('201ca618-c173-4e5f-9b6d-81eb968b041e', 'Note 10', '650');

INSERT INTO public.cart_items(
	cart_id, product_id, quantity)
	VALUES 
	('daa76a35-af45-4ec9-a307-59282d9fdba8', '9144413e-5743-4afe-b366-7ff765abd096', '1'),
	('daa76a35-af45-4ec9-a307-59282d9fdba8', '56b6e5e8-7d7c-45e3-80b5-20d66a31da46', '2');		   

INSERT INTO public.cart_ops(
	id, type, value)
	VALUES ('ee28e81a-c95e-4290-b2ba-221088c1dadf', 'tax', '7'),
	   	   ('f002c3e4-9ede-4be0-bdfc-591ac34271f3', 'discount', '1.5');	
