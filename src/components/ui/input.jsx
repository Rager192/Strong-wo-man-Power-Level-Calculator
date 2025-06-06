import React from 'react';

const Input = ({ label, value, onChange, type = 'text', placeholder }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && <label style={{ display: 'block', marginBottom: '0.3rem' }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
};

export default Input;

