import { useForm } from "react-hook-form";
import { login } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await login(data);
      navigate('/');
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-400 px-6 py-16">
      <div className="w-full max-w-md">
        {/* Card container */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          {/* Header section with chat illustration */}
          <div className="px-10 pt-10 pb-6 text-center">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-700 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to continue chatting</p>
          </div>
          
          {/* Login form */}
          <div className="px-10 pt-4 pb-10 bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  Email Address
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="block w-full pl-12 pr-4 py-4 border-0 rounded-xl bg-blue-50 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>}
              </div>
              
              {/* Password field */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                    onClick={() => navigate('/forgot-password')}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="block w-full pl-12 pr-12 py-4 border-0 rounded-xl bg-blue-50 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    {...register("password", { required: "Password is required" })}
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-blue-500 hover:text-blue-600 focus:outline-none transition duration-200"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-2">{errors.password.message}</p>}
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-200 ease-in-out mt-8"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            
            {/* Register link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="font-medium text-blue-500 hover:text-blue-600 transition duration-200 ease-in-out"
                >
                  Sign up now
                </button>
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="px-10 py-4 bg-gray-50 text-center">
            <p className="text-xs text-gray-400">
              © 2025 Chat App • 
              <a href="#" className="text-blue-500 hover:text-blue-600 ml-1">
                Privacy
              </a>{" "}
              •
              <a href="#" className="text-blue-500 hover:text-blue-600 ml-1">
                Terms
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}