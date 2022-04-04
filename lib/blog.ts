import { promises as fs } from 'fs'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { default as gfm } from 'remark-gfm'
import { default as rehypeSlug } from 'rehype-slug'
import path from 'path'
import * as humanizeDuration from 'humanize-duration'

const lastUpdated = (updated: Date): string => {
  const age = new Date().getTime() - updated.getTime()
  return `${humanizeDuration(age, { largest: 1 })} ago`
}

const EXT_PATTERN = /\.mdx?/
const POSTS_DIR = path.join(process.cwd(), 'blog')

// remove published date, it can't be serialized to JSON
export type PropPost = Omit<Post, 'published'> & { published_human: string }

export const postToPropPost = ({ published, ...rest }: Post): PropPost => ({
  ...rest,
  published_human: lastUpdated(published),
})

const getAllPostFilenames =async () => {
  return (await fs.readdir(POSTS_DIR))
  .filter((file) => path.extname(file).match(EXT_PATTERN))
}

const filenameToSlug = (filename: string): string => path.parse(filename).name

export const getPostSlugs = async (): Promise<string[]> => {
  return (await getAllPostFilenames())
    .map(filenameToSlug)
}

export interface Post {
  slug: string
  title: string
  description: string
  published: Date
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
    published: frontmatter!.date as unknown as Date,
    content: mdxSource,
  }
}
