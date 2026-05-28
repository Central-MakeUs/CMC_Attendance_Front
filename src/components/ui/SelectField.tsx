'use client';

import Select from './Select';

interface SelectFieldLabelProps {
  children: React.ReactNode;
  className?: string;
}

function SelectFieldLabel({ children, className = '' }: SelectFieldLabelProps) {
  return (
    <span className={`text-sm font-semibold text-grayscale-500 ${className}`}>
      {children}
    </span>
  );
}

interface SelectFieldInputProps {
  options: string[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

function SelectFieldInput({
  options,
  value,
  placeholder,
  onChange,
  className = '',
}: SelectFieldInputProps) {
  return (
    <Select value={value || null} onChange={(v) => onChange(v ?? '')} className={className}>
      <Select.Trigger
        className={`flex items-center justify-between w-full h-14 border-b-2 ${
          value ? 'border-primary' : 'border-grayscale-100'
        } focus:border-primary focus:outline-none transition-colors`}
      >
        <span className={value ? 'text-xl text-grayscale-900' : 'text-xl text-grayscale-300'}>
          {value || placeholder}
        </span>
        <Select.Chevron />
      </Select.Trigger>
      <Select.Content className=" w-full max-h-[200px] overflow-y-auto bg-white rounded-2xl shadow-[0px_1px_4px_0px_rgba(0,0,0,0.03),0px_4px_12px_0px_rgba(0,0,0,0.16)]">
        {options.map((option) => (
          <Select.Item
            key={option}
            value={option}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-grayscale-500 hover:bg-grayscale-50 transition-colors"
          >
            {option}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
}

interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

function SelectField({ label, options, value, placeholder, onChange }: SelectFieldProps) {
  return (
    <div className="relative flex flex-col gap-1 w-full">
      <SelectFieldLabel>{label}</SelectFieldLabel>
      <SelectFieldInput options={options} value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
}

SelectField.Label = SelectFieldLabel;
SelectField.Input = SelectFieldInput;

export default SelectField;
