import { Form } from "react-router-dom"; // Assuming react-router-dom v6.4+ Form component
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Link for navigation
import { registerUser } from "../API/authAPI"; // Make sure this path is correct

const Register = () => {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState({});

  const primaryOrangeBg = "bg-orange-500 hover:bg-orange-600";
  const primaryOrangeText = "text-orange-500";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    const newErrors = {};

    if (username.length < 3) {
      newErrors.username = "Username must contain at least 3 letters";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address"; // Changed for better clarity
    }
    if (password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters"; // Changed for better clarity
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear validation errors before API call

    try {
      await registerUser({ username, email, password });
      navigate("/login");
    } catch (error) {
      setErrors({ api: error.message || "Registration failed. Please try again." });
    }
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
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Create Your Account</h2>

        <Form className="space-y-6" onSubmit={handleSubmit}>
          {errors.api && (
            <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium">
              {errors.api}
            </p>
          )}

          {/* Username Input */}
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
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
              type="email" // Use type="email" for better browser validation
              ref={emailRef}
              placeholder="Enter your email"
              name="email"
              id="email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
              type="password"
              ref={passwordRef}
              placeholder="Create a strong password"
              name="password"
              id="password"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            className={`w-full px-6 py-3 text-lg font-semibold text-white rounded-lg transition duration-150 ${primaryOrangeBg} shadow-md`}
            type="submit"
          >
            Register
          </button>
          
          <p className="mt-2 text-center text-gray-600">
            Already have an account? {' '}
            <Link to="/login" className={`${primaryOrangeText} font-semibold hover:underline focus:outline-none`}>
              Login here
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;