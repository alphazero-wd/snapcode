import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/features/users/types";
import { redirect } from "next/navigation";
import { ProfileHeader } from "@/features/users/profile";
import { Markdown } from "@/features/common/markdown";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns/format";
import { ProfilePosts } from "@/features/users/posts";

interface ProfilePageParams {
  params: {
    username: string;
  };
}

const content = `<blockquote><p>Being able to print <u>Hello World</u> to the console is a crucial incipient stage of mastering a programming language - said some programmer.</p></blockquote><p>In <mark>Python</mark>, we can print <strong><em>Hello World</em></strong> to the console as following</p><pre><code class="language-python">print("Hello World")</code></pre><p>Run the code above, we get the following output:</p><pre><code>Hello World</code></pre><p>Congrats on writing your <u>first</u> Python code!</p><img src="https://t3.ftcdn.net/jpg/01/16/75/94/360_F_116759427_l4AGnmouXXUnW4YGKHJrmYHoMrBpjh0L.jpg" /><p>Happy coding :) #Python #Coding #Programming</p><p><a href="https://github.com/alphazero-wd">Check out my GitHub</a></p>`;

export default async function ProfilePage({
  params: { username },
}: ProfilePageParams) {
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single<Profile>();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!data) redirect("/not-found");
  return (
    <div className="flex flex-col gap-y-3">
      <ProfileHeader profile={data} />
      <div>
        <span className="text-2xl font-bold tracking-tight text-foreground">
          {data.display_name || data.username}
        </span>
        <span className="text-sm ml-2 text-muted-foreground">
          @{data.username}
        </span>
      </div>
      <div className="text-muted-foreground flex items-center text-sm gap-x-2">
        <CalendarDaysIcon className="w-4 h-4" />
        Joined {format(new Date(data.created_at), "MMMM y")}
      </div>
      <Markdown content={content} />

      <div className="mt-3 grid gap-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
        <ProfilePosts user={user} profileId={data.user_id} />
      </div>
    </div>
  );
}
