import { AUTH_KEY, Api } from '@/service/api';
import { useState, createContext, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

type UserType = {
  id: string;
  address: string;
  isAuth: boolean;
};

type AuthContextProps = {
  user: UserType;
  setUser: (c: UserType) => void;
  removeAuth: () => void;
  updateUser: (c: string) => void;
};

type TokenType = {
  id: string;
  address: string;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    id: '',
    address: '',
    isAuth: false
  });

  const updateUser = (token: string) => {
    const decoded_data: TokenType = jwtDecode(token);

    localStorage.setItem(AUTH_KEY, token);
    Api.defaults.headers['Authorization'] = token;

    setUser({
      id: decoded_data.id,
      address: decoded_data.address,
      isAuth: true
    });

    toast.success('Welcome to Decyfin admin');
  };

  const removeAuth = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser({
      id: '',
      address: '',
      isAuth: false
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, updateUser, removeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext) as AuthContextProps;
};
