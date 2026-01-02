import React from 'react';

const InputField = ({ type, placeholder, value, onChange, required, label, disabled = false }) => {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="input-field focus-ring"
      />
    </div>
  );
};

export default InputField;