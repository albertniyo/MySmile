import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-stone-900 text-stone-50 shadow-md hover:bg-stone-700 hover:shadow-xl hover:translate-y-[-2px]",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600",
        outline:
          "border-2 border-stone-200 bg-white text-stone-900 shadow-sm hover:border-stone-900 hover:bg-stone-50 hover:shadow-md",
        secondary:
          "bg-stone-100 text-stone-900 shadow-sm hover:bg-stone-200 hover:shadow-md",
        ghost: "text-stone-500 hover:bg-stone-50 hover:text-stone-900",
        link: "text-stone-900 underline-offset-4 hover:underline",
        minimal: "bg-transparent border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white"
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-9 rounded-full px-5 text-[10px]",
        lg: "h-14 rounded-full px-12 text-sm",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }