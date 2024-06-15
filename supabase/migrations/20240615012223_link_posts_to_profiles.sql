ALTER TABLE public.profiles
DROP COLUMN id;

ALTER TABLE public.profiles
ADD PRIMARY KEY (user_id);

ALTER TABLE public.profiles
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id)
REFERENCES auth.users (id)
ON DELETE CASCADE;

ALTER TABLE public.posts
DROP CONSTRAINT IF EXISTS fk_creator_id;

ALTER TABLE public.posts
ADD CONSTRAINT fk_creator_id
FOREIGN KEY (creator_id)
REFERENCES public.profiles (user_id)
ON DELETE CASCADE;

CREATE
OR REPLACE FUNCTION public.create_profile() RETURNS TRIGGER AS $$ BEGIN INSERT INTO public.profiles (user_id, username)
VALUES
  (
    NEW.id,
    NEW.raw_user_meta_data ->> 'username'
  );
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER create_profile_trigger
AFTER
  INSERT ON auth.users FOR EACH ROW WHEN (
    NEW.raw_user_meta_data IS NOT NULL
  ) EXECUTE FUNCTION public.create_profile();
