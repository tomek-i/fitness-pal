import React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { input, type InputVariants } from "./Input.variants"

export type InputProps = { placeholder?: string } & React.HTMLAttributes<HTMLInputElement> & InputVariants

export const Input: React.FC<InputProps> = ({
  className = "",
  size = "default",
  variant = "default",
  disabled = false,
  ...props
}) => {
  const style = clsx(input({ variant, disabled, size }))

  return <input className={twMerge(style, className)} {...props}></input>
}
