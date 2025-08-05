import { unstable_createContext } from 'react-router';
import type { MyProfileResult } from './api/users';

export const userContext = unstable_createContext<MyProfileResult | null>(null);
