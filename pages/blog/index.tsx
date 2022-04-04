import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import MainLayout from '../../layouts/MainLayout'
import { getAllPosts, Post, postToPropPost, PropPost } from '../../lib/blog'

export const getStaticProps: GetStaticProps = async () => {
  const posts = [...(await getAllPosts())]
    .sort((b, a) => {
      if (a.published < b.published) {
        return -1
      }
      if (b.published < a.published) {
        return 1
      }
      return 0
    })
    .map(postToPropPost)

  return {
    props: {
      posts,
    },
  }
}

interface Props {
  posts: PropPost[]
}

const BlogIndex: NextPage<Props> = ({ posts }) => {
  return (
    <MainLayout>
      <div className="mx-auto flex max-w-2xl flex-col p-4 lg:max-w-5xl">
        <div className="border-b border-gray-100">
          <h1 className="font-headings py-6 text-5xl font-bold text-gray-900 antialiased">
            All Posts
          </h1>
        </div>
        {posts.length < 1 ? (
          <div className="text-1xl py-6">
            <span className="pr-2 text-2xl">🧐</span> either I haven't written
            anything or the posts have been lost...
          </div>
        ) : undefined}
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`}>
            <div
              key={post.title}
              className="flex cursor-pointer flex-col gap-2 border-b border-gray-100 py-6 hover:text-gray-500"
            >
              <div className="flex flex-col justify-between sm:flex-row">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <div className="text-sm font-medium text-gray-500">
                  {post.published_human}
                </div>
              </div>
              <p>{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </MainLayout>
  )
}

export default BlogIndex
