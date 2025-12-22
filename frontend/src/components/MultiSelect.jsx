import React, { useState } from 'react';

const MultiSelect = ({ options, selectedValues, onChange, label, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (value) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter(item => item !== value)
      : [...selectedValues, value];
    onChange(newSelected);
  };

  const getSelectedLabels = () => {
    return options
      .filter(option => selectedValues.includes(option.value))
      .map(option => option.label)
      .join(', ');
  };

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div className="multiselect-container">
        <div 
          className="multiselect-input"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={selectedValues.length === 0 ? 'placeholder' : ''}>
            {selectedValues.length === 0 ? placeholder : getSelectedLabels()}
          </span>
          <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>
        
        {isOpen && (
          <div className="multiselect-dropdown">
            {options.length === 0 ? (
              <div className="multiselect-option disabled">No options available</div>
            ) : (
              options.map(option => (
                <div
                  key={option.value}
                  className={`multiselect-option ${selectedValues.includes(option.value) ? 'selected' : ''}`}
                  onClick={() => handleToggle(option.value)}
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => {}}
                  />
                  <span>{option.label}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;