import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { Geist_Mono } from "next/font/google";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import figlet from "figlet";
import { useState } from "react";

dayjs.extend(relativeTime);

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export type Frontmatter = {
  title: string;
  figletTitle: string;
  date: string;
  tags: string[];
};

export class FrontmatterFactory {
  public static createFrontmatterFromValue(title: string, date: Date, tags: string[]): Frontmatter {
    const figletTitle = figlet.textSync(title, {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    });

    const frontmatter: Frontmatter = {
      title,
      figletTitle,
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
  const [selectedPost, setSelectedPost] = useState(posts[0]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-background">
      <main className={`${geistMono.variable} font-mono w-[95vw] h-[95vh]`}>
        <div className="border-2 border-comment rounded-lg overflow-hidden h-full flex">
          {/* Side Pane */}
          <div className="w-1/4 border-r-2 border-comment p-4 overflow-y-auto">
            <h2 className="text-lg font-bold mb-4 text-foreground">Blogs</h2>
            <ul>
              {posts.map((post) => (
                <li key={post.slug}
                  className={`cursor-pointer p-1 rounded ${selectedPost.slug === post.slug ? 'bg-blue text-white' : 'text-foreground'}`}
                  onClick={() => setSelectedPost(post)}
                >
                  {post.frontmatter.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Pane */}
          <div className="w-3/4 p-4 overflow-y-auto">
            <pre className="text-green text-sm whitespace-pre-wrap">
              {selectedPost.frontmatter.figletTitle}
            </pre>
            <div className="mt-4">
              <span className="text-comment" title={dayjs(selectedPost.frontmatter.date).format("DD/MM/YYYY")}>
                Published {dayjs(selectedPost.frontmatter.date).fromNow()}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-white">
                Tags: {selectedPost.frontmatter.tags.join(', ')}
              </span>
            </div>
            <div className="mt-8">
              <Link href={`/${selectedPost.slug}`} className="text-blue hover:underline">
                Read more...
              </Link>
            </div>
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

