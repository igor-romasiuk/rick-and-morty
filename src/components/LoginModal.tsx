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

    if (!email) {
      dispatch(setError("Wubba Lubba Dub Dub! You forgot the email, Morty!"));
      return;
    }
    
    if (!password) {
      dispatch(setError("Oh geez Rick, we need a password here!"));
      return;
    }
    
    if (password.length < 6) {
      dispatch(setError("That password is weaker than a Meeseeks, Morty! At least 6 characters!"));
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      dispatch(setError("What dimension is that email from? Need a valid one!"));
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email, password }));
    dispatch(setError(null));
    dispatch(setUser({ email, password }));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={() => onClose()}
    >
      <div
        className="bg-[#1a1c1e] text-white p-12 rounded-xl shadow-2xl max-w-2xl w-[95%] transition-all transform scale-95 hover:scale-100 relative border-4 border-[#6ECCAF] shadow-[#6ECCAF]/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-3xl text-[#FF0000] hover:text-[#FF4444] transition-colors">
          ✖
        </button>
        <h2 className="text-4xl font-bold mb-8 text-center text-[#6ECCAF] font-['Schwifty'] tracking-wider">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>

        {error && (
          <div className="bg-[#FF4444] text-white p-4 rounded-md mb-6 animate-bounce text-lg">
            <p className="text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-[#6ECCAF] mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className={`w-full px-4 py-3 text-lg border-2 rounded-lg bg-[#2a2c2e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6ECCAF] 
                ${error && !email ? 'border-[#FF4444]' : 'border-[#6ECCAF]'}`}
              placeholder="rick@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-[#6ECCAF] mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              className={`w-full px-4 py-3 text-lg border-2 rounded-lg bg-[#2a2c2e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6ECCAF] 
                ${error && !password ? 'border-[#FF4444]' : 'border-[#6ECCAF]'}`}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-8">
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#6ECCAF] text-black px-8 py-3 text-lg rounded-lg hover:bg-[#5DBBA9] focus:outline-none focus:ring-2 focus:ring-[#6ECCAF] font-bold transition-all duration-200 transform hover:scale-105"
            >
              {isLoginMode ? "Login" : "Sign Up"}
            </button>
            <button
              type="button"
              onClick={() => dispatch(setLoginMode(!isLoginMode))}
              className="text-lg text-[#6ECCAF] hover:text-[#5DBBA9] underline"
            >
              {isLoginMode ? "Need an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
