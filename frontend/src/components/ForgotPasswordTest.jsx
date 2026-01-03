// Test script for forgot password functionality
import React, { useState } from 'react';
import { requestPasswordReset, validateResetToken, resetPassword } from '../services/api';

const ForgotPasswordTest = () => {
  const [email, setEmail] = useState('test@example.com');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('newpass123');
  const [results, setResults] = useState([]);

  const addResult = (message) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testForgotPassword = async () => {
    try {
      await requestPasswordReset(email);
      addResult(`✅ Password reset requested for ${email}`);
    } catch (error) {
      addResult(`❌ Error requesting reset: ${error.message}`);
    }
  };

  const testValidateToken = async () => {
    try {
      await validateResetToken(token);
      addResult(`✅ Token ${token} is valid`);
    } catch (error) {
      addResult(`❌ Token validation failed: ${error.message}`);
    }
  };

  const testResetPassword = async () => {
    try {
      await resetPassword(token, newPassword);
      addResult(`✅ Password reset successfully`);
    } catch (error) {
      addResult(`❌ Password reset failed: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>Forgot Password Test Suite</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>1. Request Password Reset</h3>
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={testForgotPassword}>Test Forgot Password</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>2. Validate Reset Token</h3>
        <input 
          value={token} 
          onChange={(e) => setToken(e.target.value)}
          placeholder="Reset Token"
          style={{ marginRight: '10px', padding: '5px', width: '300px' }}
        />
        <button onClick={testValidateToken}>Validate Token</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>3. Reset Password</h3>
        <input 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          type="password"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={testResetPassword}>Reset Password</button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Test Results:</h3>
        <div style={{ 
          background: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '5px',
          maxHeight: '300px',
          overflow: 'auto'
        }}>
          {results.map((result, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              {result}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordTest;