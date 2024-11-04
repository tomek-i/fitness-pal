import { cva, type VariantProps } from "class-variance-authority"

export const input = cva("px-4 py-2  dark:text-white", {
  variants: {
    variant: {
      default: "",
    },
    disabled: {
      true: "cursor-not-allowed bg-slate-200 !text-slate-300",
      false: "",
    },
    size: {
      default: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    disabled: false,
  },
})

export type InputVariants = VariantProps<typeof input>
