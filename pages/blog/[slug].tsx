import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import {
  getPost,
  getPostSlugs,
  Post,
  postToPropPost,
  PropPost,
} from '../../lib/blog'
import { MDXRemote } from 'next-mdx-remote'
import { mdxComponents } from '../../components/MDXComponents'
import MainLayout from '../../layouts/MainLayout'

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getPostSlugs()

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }

  const post = postToPropPost(await getPost(slug))

  return {
    props: {
      post,
    },
  }
}

interface Props {
  post: PropPost
}

const Blog: NextPage<Props> = ({ post }) => {
  return (
    <MainLayout>
      <div className="mx-auto flex max-w-2xl p-4">
        <div>
          <div className="pb-6 text-center flex flex-col gap-3">
            <span className="text-sm text-gray-600">
              {post.published_human}
            </span>
            <h1 className="pb-2 text-4xl font-bold text-gray-900">
              {post.title}
            </h1>
            <div>
              <span className="text-md italic text-gray-600">
                {post.description}
              </span>
            </div>
          </div>
          <div className="border-t">
            <MDXRemote {...post.content} components={mdxComponents} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Blog
