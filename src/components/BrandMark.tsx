import React from 'react';

interface BrandMarkProps {
  className?: string;
  inverted?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ className = '', inverted = false }) => {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          width="32"
          height="32"
          rx="10"
          fill={inverted ? '#FFFFFF' : '#17172B'}
        />
        <path
          d="M9.5 22.5V9.5L16 17.5L22.5 9.5V22.5"
          stroke={inverted ? '#7952D6' : '#B9A2F4'}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="16"
          cy="22.5"
          r="1.75"
          fill={inverted ? '#17172B' : '#FFFFFF'}
        />
      </svg>
      <span
        className={`font-display text-xl font-bold tracking-tight ${
          inverted ? 'text-white' : 'text-[#17172B]'
        }`}
      >
        Noréa
      </span>
    </span>
  );
};
