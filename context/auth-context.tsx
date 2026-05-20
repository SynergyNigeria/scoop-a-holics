"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  fulfillment: "delivery" | "carryout";
  pointsEarned: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  points: number;
  orders: Order[];
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

type AuthAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: AuthState = { user: null, isLoading: true };

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, isLoading: false };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

// Simple hash — good enough for a demo app
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}

function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("sah_users") || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem("sah_users", JSON.stringify(users));
}

function getCurrentUserEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sah_current_user");
}

interface AuthContextValue {
  state: AuthState;
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  saveOrder: (order: Omit<Order, "id" | "date" | "pointsEarned">) => number;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Seed demo account on first load
    const DEMO_EMAIL = "test@gmail.com";
    const users = getUsers();
    if (!users.find((u) => u.email === DEMO_EMAIL)) {
      const demoUser: User = {
        id: "demo-001",
        name: "Demo User",
        email: DEMO_EMAIL,
        passwordHash: simpleHash("123456"),
        points: 120,
        orders: [],
      };
      saveUsers([...users, demoUser]);
    }

    const email = getCurrentUserEmail();
    if (email) {
      const allUsers = getUsers();
      const user = allUsers.find((u) => u.email === email) ?? null;
      dispatch({ type: "SET_USER", payload: user });
    } else {
      dispatch({ type: "SET_USER", payload: null });
    }
  }, []);

  const register = (name: string, email: string, password: string) => {
    const users = getUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists." };
    }
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      passwordHash: simpleHash(password),
      points: 0,
      orders: [],
    };
    saveUsers([...users, newUser]);
    localStorage.setItem("sah_current_user", newUser.email);
    dispatch({ type: "SET_USER", payload: newUser });
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const users = getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return { success: false, error: "No account found with this email." };
    if (user.passwordHash !== simpleHash(password)) {
      return { success: false, error: "Incorrect password." };
    }
    localStorage.setItem("sah_current_user", user.email);
    dispatch({ type: "SET_USER", payload: user });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("sah_current_user");
    dispatch({ type: "SET_USER", payload: null });
  };

  // Returns points earned
  const saveOrder = (orderData: Omit<Order, "id" | "date" | "pointsEarned">): number => {
    if (!state.user) return 0;
    const pointsEarned = Math.floor(orderData.total / 100); // ₦100 = 1 point
    const order: Order = {
      ...orderData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      pointsEarned,
    };
    const users = getUsers();
    const updated = users.map((u) => {
      if (u.email === state.user!.email) {
        return {
          ...u,
          points: u.points + pointsEarned,
          orders: [order, ...u.orders],
        };
      }
      return u;
    });
    saveUsers(updated);
    const updatedUser = updated.find((u) => u.email === state.user!.email)!;
    dispatch({ type: "UPDATE_USER", payload: updatedUser });
    return pointsEarned;
  };

  return (
    <AuthContext.Provider value={{ state, register, login, logout, saveOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
