import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null)
    
    // Merge refs
    React.useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement)

    const handleInput = React.useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
      const target = e.currentTarget;
      target.style.height = "auto";
      // cap at max height (e.g. 200px)
      target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
      if (onChange) onChange(e as any);
    }, [onChange]);

    return (
      <textarea
        ref={internalRef}
        className={cn(
          "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        )}
        onInput={handleInput}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
