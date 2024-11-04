import { cva, type VariantProps } from "class-variance-authority"

export const button = cva("", {
  variants: {
    variant: {
      default: " stroke-white px-6 text-white ",
    },
    disabled: {
      true: "cursor-not-allowed bg-slate-200 !text-slate-300",
      false: "",
    },
    size: {
      default: "w-full px-6 py-3",
      small: "p-2",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      disabled: false,
      class: "hover:bg-blue-950 bg-blue-700",
    },
  ],
})

export type ButtonVariants = VariantProps<typeof button>
