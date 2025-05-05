import React, { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import toast from "react-hot-toast";
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
} from "../utils/helpers";
import { authApi } from "../mocks/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { useDispatch } from "react-redux";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone number
    if (!isValidPhoneNumber(formData.phoneNumber)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Validate password length (minimum 4 characters)
    if (!isValidPassword(formData.password)) {
      toast.error("Password must be at least 4 characters long");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      toast.success("Signup successful!");
      const userData = formData;
      const response = await authApi.signup(userData);
      dispatch(setUser(response?.user));
      localStorage.setItem("user", JSON.stringify(response?.user));
      // Navigate to the home page after successful login
      navigate("/home");
    } catch (error) {
      // Display an error message if the login fails
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Signup
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <SubmitButton text="Signup" isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};
