import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { Geist_Mono } from "next/font/google";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export type Frontmatter = {
  title: string;
  date: string;
  tags: string[];
};

export class FrontmatterFactory {
  public static createFrontmatterFromValue(title: string, date: Date, tags: string[]): Frontmatter {

    const frontmatter: Frontmatter = {
      title,
      date: date.toString(),
      tags
    }
    return frontmatter;
  }

};

interface BlogStaticProps {
  slug: string;
  frontmatter: Frontmatter;
};

export default function Blog({ posts }: { posts: BlogStaticProps[] }) {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-background">
      <main className={`${geistMono.variable} font-mono w-[95vw] h-[95vh]`}>
        <div className="border-2 border-comment rounded-lg overflow-hidden h-full flex flex-col">
          <div className="bg-comment p-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red rounded-full"></div>
              <div className="w-3 h-3 bg-yellow rounded-full"></div>
              <div className="w-3 h-3 bg-green rounded-full"></div>
            </div>
            <div className="flex-grow text-center text-white">
              <p>~/blog</p>
            </div>
          </div>
          <div className="p-4 flex-grow overflow-auto">
            <h1 className="text-2xl mb-4"><span className="text-green">❯</span> ls -la</h1>
            <ul>
              {posts.map((post: BlogStaticProps) => (
                <li key={post.slug} className="mb-2">
                  <Link href={`/${post.slug}`} className="flex items-center space-x-4">
                    <span className="text-blue flex-shrink-0">drwxr-xr-x</span>
                    <span className="text-white text-sm flex-shrink-0">
                      {post.frontmatter.tags.slice(0, 2).join(', ')}
                      {post.frontmatter.tags.length > 2 && '...'}
                    </span>
                    <span className="text-comment text-sm flex-shrink-0" title={dayjs(post.frontmatter.date).format("DD/MM/YYYY")}>{dayjs(post.frontmatter.date).fromNow()}</span>
                    <h2 className="text-foreground flex-grow min-w-0 truncate">{post.frontmatter.title}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("content"));
  const posts: BlogStaticProps[] = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join("content", filename), "utf-8");
    const { data } = matter(fileContent);
    const frontmatter = FrontmatterFactory.createFrontmatterFromValue(data.title, data.date, data.tags);

    return {
      slug: filename.replace(".md", ""),
      frontmatter,
    };
  });

  return { props: { posts } };
}

