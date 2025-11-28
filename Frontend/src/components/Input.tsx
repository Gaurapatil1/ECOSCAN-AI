import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[#F2F2F2] font-semibold mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-[#1A1A1A] border-2 border-[#2A2A2A] rounded-lg text-[#F2F2F2] focus:border-[#FF3B30] focus:outline-none transition-all ${className}`}
        {...props}
      />
      {error && (
        <p className="text-[#FF3B30] text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
