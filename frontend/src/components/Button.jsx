import React from 'react';

const Button = ({ children, onClick, type = "button", className = "", loading = false, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn card-hover ${className}`}
    >
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;