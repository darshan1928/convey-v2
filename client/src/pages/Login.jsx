import React, { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import toast from "react-hot-toast";
import { isValidEmail } from "../utils/helpers";
import { authApi } from "../mocks/authApi";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in both fields");
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      toast.success("Login successful!");
      const userData = formData;
      const response = await authApi.login(userData);
      dispatch(setUser(response?.user));
      localStorage.setItem('user', JSON.stringify(response?.user));
      // Navigate to the home page after successful login
      navigate("/home");
    } catch (error) {
      // Display an error message if the login fails
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <SubmitButton text="Login" isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};
