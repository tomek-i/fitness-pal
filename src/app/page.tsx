import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - Example Server Page",
  description: "This is a page that is pre-rendered on the server for {{pascalCase name}}.",
}

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
      </div>
    </main>
  )
}
