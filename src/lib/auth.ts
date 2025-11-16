// Hardcoded authentication for demo purposes
// Username: admin@devbrain.dev
// Password: demo123

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'DEVELOPER' | 'VIEWER';
  avatar?: string;
}

const DEMO_USER: User = {
  id: '1',
  email: 'admin@devbrain.dev',
  name: 'Demo Admin',
  role: 'ADMIN',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
};

const DEMO_CREDENTIALS = {
  email: 'admin@devbrain.dev',
  password: 'demo123',
};

export function login(email: string, password: string): User | null {
  if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('devbrain_user', JSON.stringify(DEMO_USER));
      localStorage.setItem('devbrain_auth', 'true');
    }
    return DEMO_USER;
  }
  return null;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('devbrain_user');
    localStorage.removeItem('devbrain_auth');
  }
}

export function getUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('devbrain_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('devbrain_auth') === 'true';
  }
  return false;
}
