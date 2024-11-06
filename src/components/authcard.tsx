import { useState } from 'react';

const AuthCard = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="w-full max-w-sm bg-white rounded-lg p-6 border border-gray-200"
      style={{
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        color: "#333",
      }}
    >
      <form className="space-y-6">
        <div
          className="text-2xl font-bold text-center mb-6"
          style={{
            color: "#e63946",
            textShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          Sign In
        </div>

        <label className="flex items-center gap-2 border border-gray-300 p-3 rounded-lg shadow-sm transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 text-red-500">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow bg-transparent focus:outline-none text-gray-700" placeholder="Email" />
        </label>

        <label className="flex items-center gap-2 border border-gray-300 p-3 rounded-lg shadow-sm transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 text-red-500">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" className="grow bg-transparent focus:outline-none text-gray-700" placeholder="Username" />
        </label>

        <label className="flex items-center gap-2 border border-gray-300 p-3 rounded-lg shadow-sm transition-all relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 text-red-500">
            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            className="grow bg-transparent focus:outline-none text-gray-700"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-500 hover:text-gray-800 transition-colors"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
                <path d="M1.293 8.293a1 1 0 0 1 1.414 0l5.293 5.293 5.293-5.293a1 1 0 0 1 1.414 1.414l-5.293 5.293 5.293 5.293a1 1 0 0 1-1.414 1.414l-5.293-5.293-5.293 5.293a1 1 0 0 1-1.414-1.414l5.293-5.293L1.293 9.707a1 1 0 0 1 0-1.414z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
                <path d="M8 2a6 6 0 0 1 5.92 5.001C15.078 7.718 16 9.156 16 10a8.01 8.01 0 0 1-8 8 8.01 8.01 0 0 1-8-8c0-.844.922-2.282 2.08-2.999A6 6 0 0 1 8 2z" />
              </svg>
            )}
          </button>
        </label>

        <button
          type="submit"
          className="w-full py-3 rounded-lg hover:bg-red-700 transition-colors"
          style={{
            backgroundColor: "#e63946",
            color: "white",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
            fontSize: "14px",
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AuthCard;
