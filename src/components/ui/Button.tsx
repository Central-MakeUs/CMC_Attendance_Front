import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'keyboard';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'flex items-center justify-center px-3 py-4 font-semibold text-lg leading-[1.4] transition-colors';

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'w-full max-w-[358px] rounded-2xl bg-primary text-white disabled:bg-grayscale-50 disabled:text-grayscale-700',
    keyboard: 'w-full bg-primary text-white disabled:bg-grayscale-50 disabled:text-grayscale-700',
  };

  return (
    <button className={`${base} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
