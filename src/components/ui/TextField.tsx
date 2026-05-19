import { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextField({ label, id, className = '', ...props }: TextFieldProps) {
  return (
    <div className={`flex flex-col gap-1 w-full max-w-[358px] ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-grayscale-500">
        {label}
      </label>
      <input
        id={id}
        className="w-full py-3 text-xl text-grayscale-900 placeholder:text-grayscale-300 border-b-2 border-grayscale-100 focus:border-primary focus:outline-none bg-transparent transition-colors"
        {...props}
      />
    </div>
  );
}
