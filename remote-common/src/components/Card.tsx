import React from 'react';
import ErrorBoundary from './ErrorBoundary';

export interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  children,
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          {description && (
            <p className="text-gray-600 text-sm">{description}</p>
          )}
        </div>
      )}
      <ErrorBoundary fallback={
        <div className="p-4 bg-red-50 border border-red-200 rounded text-sm text-red-600">
          Error rendering card content
        </div>
      }>
        {children}
      </ErrorBoundary>
    </div>
  );
};

export default Card;

