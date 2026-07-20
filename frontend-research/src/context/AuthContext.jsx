import { createContext, useContext, useState, useCallback } from 'react';

/**
 * Authentication Context
 * 
 * Provides skeleton auth state management.
 * TODO: Connect to backend authentication API (login, register, logout endpoints)
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Login function placeholder
   * TODO: Replace with actual API call to POST /api/auth/login
   */
  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      // TODO: const response = await authService.login(email, password);
      // Simulate login with mock data for now
      console.log('Login called with:', { email, password });
      const mockUser = {
        id: 1,
        name: 'John Smith',
        email,
        role: 'student', // 'student' | 'supervisor' | 'admin'
        avatar: null,
      };
      setUser(mockUser);
      return mockUser;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Register function placeholder
   * TODO: Replace with actual API call to POST /api/auth/register
   */
  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      // TODO: const response = await authService.register(userData);
      console.log('Register called with:', userData);
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout function placeholder
   * TODO: Replace with actual API call to POST /api/auth/logout
   */
  const logout = useCallback(() => {
    // TODO: await authService.logout();
    setUser(null);
  }, []);

  /**
   * Check if user has a specific role
   */
  const hasRole = useCallback((role) => {
    return user?.role === role;
  }, [user]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
