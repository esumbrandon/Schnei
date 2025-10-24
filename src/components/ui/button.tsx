import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', asChild = false, children, ...props }, ref) => {
    const styles = cn(
      'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-900': variant === 'default',
        'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600': variant === 'primary',
        'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500': variant === 'secondary',
        'border-2 border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500': variant === 'outline',
        'bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500': variant === 'ghost',
        'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600': variant === 'danger',
        'h-9 px-3 text-sm': size === 'sm',
        'h-11 px-5 text-base': size === 'md',
        'h-13 px-7 text-lg': size === 'lg',
      },
      className
    )
    
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>
      return React.cloneElement(child, {
        className: cn(styles, child.props.className),
      })
    }
    
    return (
      <button
        className={styles}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
