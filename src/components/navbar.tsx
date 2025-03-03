"use client"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react" // Import icons

export type NavbarProps = { disabled?: boolean } & React.HTMLAttributes<HTMLDivElement>

const menuItems: any[] = []

const user = {
  name: "John Doe",
  image: "https://ui-avatars.com/api/?background=random",
}

export const Navbar: React.FC<NavbarProps> = ({ className = "", disabled = false, ...props }) => {
  return (
    <div className="z-50 bg-red-200 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <input type="text" placeholder="Search..." className="w-1/3 rounded-md border border-gray-300 px-3 py-2" />
        <div className="ml-auto">
          {menuItems.map((item, index) => (
            <a key={index} href={item.href} className="px-3 text-gray-700 hover:text-gray-900">
              {item.label}
            </a>
          ))}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="ml-4 cursor-pointer">
              <AvatarImage src={user?.image ?? undefined} />
              <AvatarFallback className="bg-secondary">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() ?? "?"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <User className="size-4" />
              <span>{user?.name}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 text-red-600 focus:text-red-600">
              <LogOut className="size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
