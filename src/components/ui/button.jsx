import React from 'react';

const Button = ({ onClick, children, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '0.6rem 1.2rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: disabled ? '#aaa' : '#007bff',
        color: 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '1rem',
      }}
    >
      {children}
    </button>
  );
};

export default Button;

