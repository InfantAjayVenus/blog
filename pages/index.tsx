import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { Geist, Geist_Mono } from "next/font/google";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChevronRight } from "heroicons-react";

dayjs.extend(relativeTime);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
    <main className={`${geistMono.variable} ${geistSans.variable} font-[family-name:var(--font-geist-sans)] container m-4 lg:m-12`}>
      <h1 className="font-black text-4xl border-b-2 border-gray-500 pb-8 mb-4">Welcome to Ajay's Blogs</h1>
      <ul>
        {posts.map((post: BlogStaticProps) => (
          <li key={post.slug} className="border border-gray-500 rounded-md p-4 flex justify-between items-center">
            <div>
              <Link href={`/${post.slug}`}>
                <h2 className="font-bold text-2xl">{post.frontmatter.title}</h2>
                <p className="text-gray-500" title={dayjs(post.frontmatter.date).format("DD/MM/YYYY")}>{dayjs(post.frontmatter.date).fromNow()}</p>
                <p className="text-gray-500 text-sm">{post.frontmatter.tags.join(', ')}</p>
              </Link>
            </div>
            <div className="text-gray-500">
              <ChevronRight onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} size={40}/>
            </div>
          </li>
        ))}
      </ul>
    </main>
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

