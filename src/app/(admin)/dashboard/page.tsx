"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-auto p-4">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Example Card</CardTitle>
            <CardDescription>Some Description</CardDescription>
          </CardHeader>
          <CardContent>some content</CardContent>
        </Card>

        <Card>
        <CardHeader>
            <CardTitle>Example Card</CardTitle>
            <CardDescription>Some Description</CardDescription>
          </CardHeader>
          <CardContent>some content</CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          </CardFooter>
        </Card>

        <Card>
        <CardHeader>
            <CardTitle>Example Card</CardTitle>
            <CardDescription>Some Description</CardDescription>
          </CardHeader>
          <CardContent>some content</CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-sm">Showing last activity</p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
