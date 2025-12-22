import React from 'react';

const InputField = ({ type, placeholder, value, onChange, required, label }) => {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="input-field focus-ring"
      />
    </div>
  );
};

export default InputField;