import Image from 'next/image'

export const mdxComponents = {
  h1: (props: any) => (
    <h2
      className="pt-6 pb-4 text-2xl font-bold text-gray-900 antialiased"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h3
      className="pt-6 pb-2 text-xl font-bold text-gray-900 antialiased"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h4
      className="pt-4 text-lg font-bold text-gray-900 antialiased"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h5
      className="pt-4 text-lg font-bold text-gray-900 antialiased"
      {...props}
    />
  ),
  h5: (props: any) => (
    <h6 className="pt-4 font-bold text-gray-800 antialiased" {...props} />
  ),
  blockquote: (props: any) => (
    <div className="px-2 py-4 text-md text-gray-600">
      <div className="border-l-2 border-gray-300 bg-gray-50 p-2 italic" {...props} />
    </div>
  ),
  ul: (props: any) => (
    <ul className="list-outside list-disc py-2 pl-6" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-outside list-decimal py-2 pl-6" {...props} />
  ),
  li: (props: any) => <li {...props} />,
  a: (props: any) => <a className="text-blue-600 underline" {...props} />,
  pre: (props: any) => <pre className="py-1 px-2 rounded font-mono text-sm text-gray-100 bg-cyan-900" {...props} />,
  code: (props: any) => <code className="p-0.5 rounded font-mono text-sm  bg-cyan-100" {...props} />,
  img: (props: any) => (
    <div className="relative mx-auto h-64 w-96">
      <Image layout="fill" {...props} />
    </div>
  ),
  table: (props: any) => (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden border sm:rounded-lg">
            <table className="min-w-full" {...props}></table>
          </div>
        </div>
      </div>
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-gray-50 dark:bg-gray-700" {...props} />
  ),
  tbody: (props: any) => (
    <tbody className="bg-white dark:bg-slate-800" {...props} />
  ),
  th: (props: any) => (
    <th
      scope="col"
      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400"
      {...props}
    />
  ),
  tr: (props: any) => (
    <tr
      className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className="whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900 dark:text-white"
      {...props}
    />
  ),
}
