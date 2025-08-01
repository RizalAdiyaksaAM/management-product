// components/ui/loader.tsx
import React from 'react';

interface LoaderProps {
  isLoading: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const SimpleLoader: React.FC<LoaderProps> = ({ 
  isLoading, 
  size = 'md',
  color = 'blue-600' 
}) => {
  if (!isLoading) return null;

  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div 
        className={`${sizeClasses[size]} border-gray-200 border-t-${color} rounded-full animate-spin`}
      ></div>
    </div>
  );
};

// Hook untuk loading state
export const usePageLoader = (duration: number = 3000) => { 
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return { isLoading, setIsLoading };
};