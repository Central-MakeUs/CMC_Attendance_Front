'use client';

import { InputHTMLAttributes, LabelHTMLAttributes } from 'react';

interface TextFieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

function TextFieldLabel({ children, className = '', ...props }: TextFieldLabelProps) {
  return (
    <label className={`text-sm font-semibold text-grayscale-500 ${className}`} {...props}>
      {children}
    </label>
  );
}

interface TextFieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
  error?: boolean;
}

function TextFieldInput({ suffix, error, className = '', value, ...props }: TextFieldInputProps) {
  const borderClass = error
    ? 'border-red-400'
    : value
    ? 'border-primary'
    : 'border-grayscale-100';

  return (
    <div className={`flex items-center border-b-2 transition-colors ${borderClass} ${className}`}>
      <input
        autoComplete="off"
        value={value}
        className="flex-1 min-w-0 py-3 text-xl text-grayscale-900 placeholder:text-grayscale-300 focus:outline-none bg-transparent"
        {...props}
      />
      {suffix && <span className="text-xl text-grayscale-700 shrink-0">{suffix}</span>}
    </div>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function TextField({ label, id, className = '', value, ...props }: TextFieldProps) {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <TextFieldLabel htmlFor={id}>{label}</TextFieldLabel>
      <TextFieldInput id={id} value={value} {...props} />
    </div>
  );
}

TextField.Label = TextFieldLabel;
TextField.Input = TextFieldInput;

export default TextField;
