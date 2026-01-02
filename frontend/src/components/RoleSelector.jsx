import React from 'react';

const RoleSelector = ({ selectedRole, onRoleChange, disabled = false }) => {
  return (
    <div className="role-selector">
      <div className="role-option">
        <input
          type="radio"
          id="student"
          name="role"
          value="student"
          checked={selectedRole === 'student'}
          onChange={(e) => onRoleChange(e.target.value)}
          disabled={disabled}
        />
        <label htmlFor="student">Student</label>
      </div>
      <div className="role-option">
        <input
          type="radio"
          id="teacher"
          name="role"
          value="teacher"
          checked={selectedRole === 'teacher'}
          onChange={(e) => onRoleChange(e.target.value)}
          disabled={disabled}
        />
        <label htmlFor="teacher">Teacher</label>
      </div>
    </div>
  );
};

export default RoleSelector;