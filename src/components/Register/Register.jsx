import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5500/api/auth/register", credentials);
      setLoading(false);
      navigate("/");
    } catch (error) {
      // console.error("Error registering user:", error.message);
      if (error.response.data.includes("E11000")) {
        setError("User already exists.");
        setLoading(false);
        return;
      }
      setError("Failed to register user.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <input
              type="checkbox"
              name="isAdmin"
              checked={credentials.isAdmin}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label className="block text-gray-700">Register as Admin</label>
          </div>
          <div className="flex justify-between">
            <Link to="/" className="text-blue-500 underline">
              Already have an account? Login here.
            </Link>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
