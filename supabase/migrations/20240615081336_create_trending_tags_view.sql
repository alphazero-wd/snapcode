create view trending_tags as
select t.name, count(tp.post_id)
from tags_posts tp
inner join tags t
on t.id = tp.tag_id
group by t.name;
