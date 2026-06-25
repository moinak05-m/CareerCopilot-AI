import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";
import { registerUnauthorizedHandler } from "../services/api";

export const AuthContext = createContext(null);

const TOKEN_KEY = "ascent_token";
const USER_KEY = "ascent_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [authLoading, setAuthLoading] = useState(true);

  const persistSession = useCallback((nextToken, nextUser) => {
    if (nextToken) localStorage.setItem(TOKEN_KEY, nextToken);
    if (nextUser) localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  // Auto-login: verify any stored token on first load
  useEffect(() => {
    registerUnauthorizedHandler(() => {
      logout();
      window.location.href = "/login";
    });

    const bootstrap = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) {
        setAuthLoading(false);
        return;
      }
      try {
        const data = await authService.getMe();
        const freshUser = data?.user ?? data;
        setUser(freshUser);
        localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
      } catch {
        logout();
      } finally {
        setAuthLoading(false);
      }
    };
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (credentials) => {
      const data = await authService.login(credentials);
      const nextToken = data?.token ?? data?.accessToken;
      const nextUser = data?.user ?? { name: data?.name, email: data?.email };
      persistSession(nextToken, nextUser);
      return data;
    },
    [persistSession]
  );

  const register = useCallback(
    async (payload) => {
      const data = await authService.register(payload);
      const nextToken = data?.token ?? data?.accessToken;
      const nextUser = data?.user ?? { name: data?.name, email: data?.email };
      if (nextToken) persistSession(nextToken, nextUser);
      return data;
    },
    [persistSession]
  );

  const updateUser = useCallback((nextUser) => {
    setUser(nextUser);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      authLoading,
      login,
      register,
      logout,
      updateUser,
    }),
    [user, token, authLoading, login, register, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
