import { cva, type VariantProps } from "class-variance-authority";

import { twMerge } from "tailwind-merge";

const button = cva(
  [
    "justify-center",
    "inline-flex",
    "items-center",
    "rounded-xl",
    "text-center",
    "border",
    "border-blue-400",
    "transition-colors",
    "delay-75",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-blue-400", "text-white", "hover:enabled:bg-blue-700"],
        secondary: ["bg-transparent", "text-blue-400", "hover:enabled:bg-blue-400", "hover:enabled:text-white"],
      },
      size: {
        sm: ["min-w-min", "h-full", "min-h-max", "text-sm", "py-1.5", "px-4"],
        lg: ["min-w-min", "h-full", "min-h-max", "text-lg", "py-2.5", "px-6"],
      },
      underline: { true: ["underline"], false: [] },
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof button> {
  underline?: boolean;
  href: string;
}

export function Button({ className, intent, size, underline, ...props }: ButtonProps) {
  return (
    <a className={twMerge(button({ intent, size, className, underline }))} {...props}>
      {props.children}
    </a>
  );
}
