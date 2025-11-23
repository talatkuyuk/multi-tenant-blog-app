import * as React from "react";
import { useButton } from "react-aria";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import styles from "./button.module.css";

const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      default: styles.variantDefault,
      destructive: styles.variantDestructive,
      outline: styles.variantOutline,
      secondary: styles.variantSecondary,
      ghost: styles.variantGhost,
      link: styles.variantLink,
    },
    size: {
      default: styles.sizeDefault,
      sm: styles.sizeSm,
      lg: styles.sizeLg,
      icon: styles.sizeIcon,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, disabled, children, ...props }, ref) => {
    // Only pass supported props to useButton
    const { formAction, value, ...ariaProps } = props;

    // Tell react-aria we are working with an HTMLButtonElement and
    // narrow/cast the props so event handler types line up.
    // Casting here avoids the mismatched FocusEvent/Element types.
    const { buttonProps } = useButton(
      {
        ...(ariaProps as unknown as Record<string, unknown>),
        isDisabled: disabled,
      } as any,
      (ref as React.RefObject<HTMLButtonElement>) ?? null
    );

    return (
      <button
        {...buttonProps}
        ref={ref}
        className={clsx(
          buttonVariants({ variant, size }),
          disabled && styles.disabled,
          className
        )}
        disabled={disabled}
        formAction={formAction}
        value={value}
      >
        {children}
      </button>
    );
  }
);

export { Button, buttonVariants };
