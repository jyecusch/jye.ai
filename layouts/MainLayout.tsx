import { Github, Twitter } from 'lucide-react'
import { NextPage } from 'next'
import Link from 'next/link'

const MainLayout: NextPage = ({ children }) => {
  return (
    <div className="min-h-screen bg-paper text-gray-800 antialiased">
      <nav className="border-b border-gray-100">
        <div className="m-auto flex h-20 justify-between px-6">
          <Link href="/">
            <a className="my-auto text-2xl">Jye Cusch</a>
          </Link>
          <div className="my-auto flex gap-8">
            {[
              {
                href: 'https://twitter.com/JyeCusch',
                icon: <Twitter />,
              },
              {
                href: 'https://github.com/jyecusch',
                icon: <Github />,
              },
            ].map(({ href, icon }) => (
              <Link href={href} key={href}>
                <div className="cursor-pointer rounded-full bg-white p-2">
                  {icon}
                </div>
              </Link>
            ))}
          </div>
          {/* <Link href="/blog">
            <a className="my-auto font-medium text-lg">blog</a>
          </Link> */}
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}

export default MainLayout
