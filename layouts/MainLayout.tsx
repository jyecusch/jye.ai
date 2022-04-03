import { NextPage } from 'next'
import Link from 'next/link'

const MainLayout: NextPage = ({ children }) => {
  return (
    <div>
      <nav className="border-b border-gray-100">
        <div className=" relative m-auto flex h-20 justify-between px-6">
          <Link href="/">
            <a className="my-auto text-2xl font-semibold">
              Jye Cusch
            </a>
          </Link>
          <Link href="/blog">
            <a className="my-auto font-medium text-lg">blog</a>
          </Link>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}

export default MainLayout
