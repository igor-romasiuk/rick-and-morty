"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setLoginMode, setEmail, setPassword, setError, setUser } from "@/redux/slices/authSlice";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const dispatch = useDispatch();
  const { isLoginMode, email, password, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch(setError("Both email and password are required."));
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email, password }));

    dispatch(setError(null));
    dispatch(setUser({ email, password }));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={() => onClose()}
    >
      <div
        className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-lg w-full transition-all transform scale-95 hover:scale-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-400">
          ✖
        </button>
        <h2 className="text-3xl font-bold mb-4 text-center text-green-500">
          {isLoginMode ? "Log In" : "Sign Up"}
        </h2>

        {error && (
          <div className="bg-red-600 text-white p-2 rounded-md mb-4 animate-pulse">
            <p className="text-center text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className={`w-full px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 
                ${error && !email ? 'border-red-500' : 'border-gray-500'}`}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              className={`w-full px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 
                ${error && !password ? 'border-red-500' : 'border-gray-500'}`}
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isLoginMode ? "Log In" : "Sign Up"}
            </button>
            <button
              type="button"
              onClick={() => dispatch(setLoginMode(!isLoginMode))}
              className="text-sm text-blue-500 hover:text-blue-400"
            >
              {isLoginMode ? "Need an account? Sign Up" : "Already have an account? Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
