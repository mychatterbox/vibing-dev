import rss, { type RSSOptions } from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: RSSOptions) {
  const all = await getCollection("published");
  const pub = all.filter((p) => !p.slug.startsWith("draft/"));
  pub.sort((a, b) => b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime());
  return rss({
    title: "vibing.dev",
    description: "Outlet for whatever I'm vibing. Mostly web dev.",
    site: context.site,
    items: pub.map(({ data: { title, pubDatetime, description }, slug }) => ({
      title,
      pubDatetime,
      description,
      link: `/${slug}`,
    })),
  });
}
