import { createContext } from 'react';
import { User as FirebaseUser } from 'firebase/auth';

export interface AuthContextType {
  user: FirebaseUser | null;
  token: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
