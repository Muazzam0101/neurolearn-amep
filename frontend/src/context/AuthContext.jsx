import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Initialize state directly from localStorage
  const [studentsTable, setStudentsTable] = useState(() => {
    return JSON.parse(localStorage.getItem('students_table')) || [];
  });
  
  const [teachersTable, setTeachersTable] = useState(() => {
    return JSON.parse(localStorage.getItem('teachers_table')) || [];
  });
  
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('current_user_session')) || null;
  });
  
  const [hydrated, setHydrated] = useState(false);

  // Set hydrated after initial state is loaded
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Save tables to localStorage whenever they change
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('students_table', JSON.stringify(studentsTable));
    }
  }, [studentsTable, hydrated]);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('teachers_table', JSON.stringify(teachersTable));
    }
  }, [teachersTable, hydrated]);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('current_user_session', JSON.stringify(currentUser));
    }
  }, [currentUser, hydrated]);

  const signup = (email, password, role) => {
    if (!hydrated) {
      throw new Error('Authentication system is loading. Please wait.');
    }

    const table = role === 'student' ? studentsTable : teachersTable;
    const setTable = role === 'student' ? setStudentsTable : setTeachersTable;

    // Check if email already exists in the selected role table
    if (table.find(user => user.email === email)) {
      throw new Error('An account with this email already exists for the selected role');
    }

    const newUser = {
      [role === 'student' ? 'student_id' : 'teacher_id']: Date.now().toString(),
      email,
      password,
      role
    };

    const updatedTable = [...table, newUser];
    setTable(updatedTable);
    
    // Immediately sync to localStorage
    localStorage.setItem(role === 'student' ? 'students_table' : 'teachers_table', JSON.stringify(updatedTable));
    
    return newUser;
  };

  const login = (email, password, role) => {
    if (!hydrated) {
      throw new Error('Authentication system is loading. Please wait.');
    }

    const table = role === 'student' ? studentsTable : teachersTable;

    // Check if email exists in the selected role table
    const user = table.find(u => u.email === email);
    
    if (!user) {
      throw new Error('No account exists for the selected role');
    }

    // Check password
    if (user.password !== password) {
      throw new Error('Invalid credentials');
    }

    setCurrentUser(user);
    localStorage.setItem('current_user_session', JSON.stringify(user));
    
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('current_user_session');
  };

  const clearAllData = () => {
    setCurrentUser(null);
    setStudentsTable([]);
    setTeachersTable([]);
    localStorage.removeItem('students_table');
    localStorage.removeItem('teachers_table');
    localStorage.removeItem('current_user_session');
    localStorage.removeItem('amep_courses');
    localStorage.removeItem('amep_topics');
    localStorage.removeItem('contents_table');
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    clearAllData,
    studentsTable,
    teachersTable,
    hydrated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};