import { Form } from "react-router-dom"; // Assuming react-router-dom v6.4+ Form component
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../API/authAPI"; // Make sure this path is correct
import { useDispatch } from "react-redux";
import { authVerify } from '../store/slice/checkAuth'; // Make sure this path is correct

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");

  const primaryOrangeBg = "bg-orange-500 hover:bg-orange-600";
  const primaryOrangeText = "text-orange-500";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCred = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      setErrorMsg(""); // clear previous error
      await loginUser(userCred);
      await dispatch(authVerify());
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message || "Login failed");
    }
  };

  const navigateToSignUp = () => {
    navigate('/register');
  };

  const navigateToForgotPassword = () => {
    // Implement your forgot password navigation or modal here
    console.log("Navigate to Forgot Password");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800 flex flex-col justify-center items-center p-4">
      
      {/* Brand Logo */}
      <div className={`w-full max-w-md text-center mb-8`}>
        <a href="/" className="text-4xl font-extrabold tracking-tight">
          skill<span className={primaryOrangeText}>X</span>change
        </a>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Login</h2>

        {errorMsg && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium">
            {errorMsg}
          </p>
        )}

        <Form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
              type="text"
              ref={usernameRef}
              placeholder="Enter your Username"
              name="username"
              id="username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
              type="password"
              ref={passwordRef}
              placeholder="Enter your password"
              name="password"
              id="password"
              required
            />
            <button
              type="button"
              onClick={navigateToForgotPassword}
              className={`mt-2 text-sm ${primaryOrangeText} hover:underline focus:outline-none`}
            >
              Forgot Password?
            </button>
          </div>
          
          <button
            className={`w-full px-6 py-3 text-lg font-semibold text-white rounded-lg transition duration-150 ${primaryOrangeBg} shadow-md`}
            type="submit"
          >
            Login
          </button>
        </Form>

        <p className="mt-8 text-center text-gray-600">
          Don't have an account? {' '}
          <button
            type="button"
            onClick={navigateToSignUp}
            className={`${primaryOrangeText} font-semibold hover:underline focus:outline-none`}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;