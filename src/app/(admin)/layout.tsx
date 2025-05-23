import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"

export default function BackendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Sidebar />
      <div className="">
        <Navbar />

        {children}
      </div>
    </>
  )
}

// LAYOUT ONE

// return (
//   <div className="flex min-h-screen flex-col">
//     <Navbar />
//     {/* wrapper for 2 colums */}
//     <div className="flex flex-1 overflow-hidden">
//       <Sidebar />

//       {/* main content start */}
//       <main className="flex-1 overflow-auto   p-4">
//         <h1>Main content - Dashboard</h1>
//         <pre>
//           <code>{JSON.stringify(session, null, 2)}</code>
//         </pre>
//       </main>
//       {/* main content end */}
//     </div>
//   </div>
// )
