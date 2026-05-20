import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'primary-light' | 'keyboard';
type ButtonSize = 'md' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'flex items-center justify-center px-3 font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed';

  const sizeStyles: Record<ButtonSize, string> = {
    md: 'py-4 text-lg leading-[1.4] rounded-2xl',
    sm: 'h-12 py-2 text-base rounded-xl',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'w-full bg-primary text-white disabled:bg-grayscale-50 disabled:text-grayscale-700',
    secondary: 'w-full bg-grayscale-50 text-grayscale-700',
    'primary-light': 'w-full bg-primary-light text-primary',
    keyboard:
      'w-full bg-primary text-white disabled:bg-grayscale-50 disabled:text-grayscale-700',
  };

  return (
    <button
      className={`${base} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
