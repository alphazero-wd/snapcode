create policy "Allow anyone to view avatars and banners"
on storage.objects
for select
using ( bucket_id = 'snapcode' );

create policy "Allow authenticated to upload avatars and banners"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'snapcode' and
  (storage.foldername(name))[1] in ('avatars', 'banners')
);

create policy "User can update their own avatar and banner"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'snapcode' and
  (storage.foldername(name))[1] in ('avatars', 'banners') and
  owner_id = (select auth.uid()::text)
);

create policy "User can delete their own avatar and banner"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'snapcode' and
  (storage.foldername(name))[1] in ('avatars', 'banners') and
  owner_id = (select auth.uid()::text)
);
