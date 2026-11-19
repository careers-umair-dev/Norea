import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EAE3FF] via-[#F8F7FC] to-[#F0EFF5] text-[#77758A] p-4 text-center ${className}`}
        role="img"
        aria-label={alt || fallbackTitle || 'Fashion item'}
      >
        <Sparkles className="w-6 h-6 text-[#7952D6] mb-2" strokeWidth={1.6} />
        <span className="text-xs font-medium text-[#17172B]/80 line-clamp-2">
          {fallbackTitle || alt || 'Noréa Editorial'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  );
};
