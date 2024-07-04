CREATE VIEW public.users with (security_invoker) AS
SELECT * FROM auth.users;
