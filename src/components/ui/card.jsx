import React from 'react';

export default function Card({ children, className }) {
  return (
    <div
      className={`bg-white shadow-md rounded-md p-4 border border-gray-200 ${className || ''}`}
      style={{ maxWidth: '400px', margin: 'auto' }}
    >
      {children}
    </div>
  );
}

