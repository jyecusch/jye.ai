import { promises as fs } from 'fs'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { default as gfm } from 'remark-gfm'
import { default as rehypeSlug } from 'rehype-slug'
import * as humanizeDuration from 'humanize-duration'
import path from 'path'

const EXT_PATTERN = /\.mdx?/
const POSTS_DIR = path.join(process.cwd(), 'blog')

const getAllPostFilenames =async () => {
  return (await fs.readdir(POSTS_DIR))
  .filter((file) => path.extname(file).match(EXT_PATTERN))
}

const filenameToSlug = (filename: string): string => path.parse(filename).name

export const getPostSlugs = async (): Promise<string[]> => {
  return (await getAllPostFilenames())
    .map(filenameToSlug)
}

const lastUpdated = (updated: Date): string => {
  const age = new Date().getTime() - updated.getTime()
  return `${humanizeDuration(age, { largest: 1 })} ago`
}

export interface Post {
  slug: string
  title: string
  description: string
  human_date: string
  content: MDXRemoteSerializeResult
}

export const getAllPosts = async (): Promise<Post[]> => {
  const filenames = await getAllPostFilenames()
  return Promise.all(filenames.map(filenameToSlug).map(getPost))
}

export const getPost = async (slug: string): Promise<Post> => {
  // TODO: improve file name resolution so it's case insensitive and handles .mdx too
  const filepath = path.join(POSTS_DIR, `${slug}.md`)
  const content = await fs.readFile(filepath, 'utf8')

  const { frontmatter, ...mdxSource } = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [gfm],
      rehypePlugins: [rehypeSlug],
    },
  })

  return {
    slug,
    title: frontmatter!.title,
    description: frontmatter!.description,
    human_date: lastUpdated(frontmatter!.date as unknown as Date),
    content: mdxSource,
  }
}
