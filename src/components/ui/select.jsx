import React from 'react';

const Select = ({ label, value, onChange, options = [] }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && <label style={{ display: 'block', marginBottom: '0.3rem' }}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <option value="" disabled>
          Bitte wählen
        </option>
        {options.map(({ value: optValue, label: optLabel }) => (
          <option key={optValue} value={optValue}>
            {optLabel}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

