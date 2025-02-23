import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Frontmatter, FrontmatterFactory } from ".";
import Link from "next/link";
import { ChevronLeft } from "heroicons-react";

dayjs.extend(relativeTime);

type Content = string;

interface BlogPostProps {
    frontmatter: Frontmatter;
    content: Content;
};

export default function BlogPost({ frontmatter, content }: BlogPostProps) {
    return (
        <>
            <Link href={'../'} className="flex items-center align-middle text-gray-500 mt-4 ml-2 lg:ml-10">
                <ChevronLeft onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} size={20} />
                go back
            </Link>
            <article className="container m-8 mt-2 lg:m-16 lg:mt-4">
                <header className="mb-8 border-b-2 border-gray-300 pb-4">
                    <h1 className="text-3xl font-extrabold">{frontmatter.title}</h1>
                    <p className="text-base font-medium text-gray-400" title={dayjs(frontmatter.date).format('DD-MM-YYYY')}>
                        {dayjs(frontmatter.date).fromNow()}
                    </p>
                </header>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h2: ({ ...props }) => <h1 className="text-2xl font-extrabold indent-1" {...props} />,
                        h3: ({ ...props }) => <h2 className="text-xl font-semibold indent-2" {...props} />,
                        h4: ({ ...props }) => <h2 className="text-lg font-semibold indent-3" {...props} />,
                        p: ({ ...props }) => <p className="my-4" {...props} />,
                        a: ({ ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
                        ul: ({ ...props }) => <ul className="list-disc list-inside" {...props} />,
                        ol: ({ ...props }) => <ol className="list-decimal list-inside" {...props} />,
                        li: ({ ...props }) => <li className="ml-4" {...props} />,
                        blockquote: ({ ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic" {...props} />,
                        code: ({ ...props }) => <code className="bg-gray-700 p-1 rounded" {...props} />,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </article>
        </>
    );
}

// **Generate paths for each Markdown file**
export const getStaticPaths: GetStaticPaths = async () => {
    const files = fs.readdirSync(path.join("content"));
    const paths = files.map((filename) => ({
        params: { slug: filename.replace(".md", "") },
    }));

    return { paths, fallback: false };
};

// **Fetch Markdown data at build time**
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const filePath = path.join("content", `${params?.slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data, content } = matter(fileContent);
    const frontmatter = FrontmatterFactory.createFrontmatterFromValue(data.title, data.date, data.tags);

    return {
        props: { frontmatter, content },
    };
};
