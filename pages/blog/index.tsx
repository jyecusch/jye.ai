import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import MainLayout from '../../layouts/MainLayout'
import { getAllPosts, Post } from '../../lib/blog'

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts()

  return {
    props: {
      posts,
    },
  }
}

interface Props {
  posts: Post[]
}

const BlogIndex: NextPage<Props> = ({ posts }) => {
  return (
    <MainLayout>
      <div className="mx-auto flex max-w-2xl flex-col p-4">
        <div className="border-b">
          <h1 className="font-headings py-6 text-4xl font-bold text-gray-900 antialiased">
            Blog
          </h1>
        </div>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`}>
            <div
              key={post.title}
              className="flex cursor-pointer flex-col gap-2 border-b py-6 hover:text-gray-500"
            >
              <div className="flex flex-col justify-between">
                <h2 className="text-xl font-medium">{post.title}</h2>
                <div className="text-sm font-light">{post.human_date}</div>
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
