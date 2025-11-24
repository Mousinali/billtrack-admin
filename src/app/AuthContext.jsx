import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⭐ added

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const expiry = localStorage.getItem("expiry");

    if (savedUser && expiry) {
      const now = Date.now();

      if (now < parseInt(expiry)) {
        setUser(JSON.parse(savedUser));   // ⭐ keep logged in
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("expiry");
      }
    }

    setLoading(false); // ⭐ done checking storage
  }, []);

  const login = () => {
    const loggedInUser = { name: "Admin" };
    setUser(loggedInUser);

    localStorage.setItem("user", JSON.stringify(loggedInUser));
    localStorage.setItem(
      "expiry",
      (Date.now() + 7 * 24 * 60 * 60 * 1000).toString()
    );

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("expiry");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
