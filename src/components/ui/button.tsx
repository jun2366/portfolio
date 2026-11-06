import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // .btn (index.css) carries the shared hover, pressed, focus-visible and disabled states.
  "btn text-sm [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Solid sky: form submit and other single solid actions
        default: "btn-solid",
        destructive: "bg-destructive text-destructive-foreground hover:enabled:bg-destructive/90",
        outline: "btn-outline",
        secondary: "btn-secondary",
        ghost: "hover:enabled:bg-secondary hover:enabled:text-foreground",
        link: "link-text hover:underline",
        // Gradient call to action: use for Book a Call only
        hero: "btn-cta",
        heroOutline: "btn-outline",
      },
      size: {
        // 44px minimum height on phones for tap targets
        default: "h-11 px-4 py-2 md:h-10",
        sm: "h-11 rounded-md px-3 md:h-9",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-11 w-11 md:h-10 md:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
