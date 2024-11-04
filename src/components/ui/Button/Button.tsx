import React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { button, type ButtonVariants } from "./Button.variants"

export type ButtonProps = {} & React.HTMLAttributes<HTMLButtonElement> & ButtonVariants

export const Button: React.FC<ButtonProps> = ({
  className = "",
  size = "default",
  variant = "default",
  disabled = false,
  ...props
}) => {
  const style = clsx(button({ variant, disabled, size }))

  return <button type="button" className={twMerge(style, className)} {...props}></button>
}
