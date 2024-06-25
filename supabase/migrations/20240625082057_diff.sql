alter table "public"."profiles" drop constraint "profiles_user_id_fkey";

alter table "public"."posts" alter column "id" set default gen_random_uuid();

alter table "public"."profiles" alter column "location" set data type character varying using "location"::character varying;


