import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://nextbooking-ten.vercel.app/api/users"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    setDeleteLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      await axios.delete(
        `https://nextbooking-ten.vercel.app/api/users/${userId}`
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      setDeleteLoading((prev) => ({ ...prev, [userId]: false }));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user.");
      setDeleteLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
            <h2 className="text-xl font-semibold text-gray-700">All Users</h2>
            <Link
              to="/add-admin"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Add Admin
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Username</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Admin</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-left">
                      {user.isAdmin ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <Link
                        to={`/dashboard/user/edit-user/${user._id}`}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 transition duration-200"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                        disabled={deleteLoading[user._id]}
                      >
                        {deleteLoading[user._id] ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
