import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../../firebase';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback((email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }, []);

  const logout = useCallback(() => {
    return auth.signOut();
  }, []);

  const signUp = useCallback((email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }, []);

  const resetPassword = useCallback(email => {
    return auth.sendPasswordResetEmail(email);
  }, []);

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function updateUsername(username) {
    return currentUser.updateProfile({ displayName: username });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUsername,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth hook must be used within AuthProvider');
  }
  return context;
};

export default AuthProvider;
