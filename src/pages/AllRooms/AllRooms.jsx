import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState({});

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://nextbooking-ten.vercel.app/api/rooms"
        );
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("Failed to fetch rooms.");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleDelete = async (roomId, hotelId) => {
    setDeleteLoading((prev) => ({ ...prev, [roomId]: true }));
    try {
      await axios.delete(
        `https://nextbooking-ten.vercel.app/api/rooms/${roomId}/${hotelId}`
      );
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
      setDeleteLoading((prev) => ({ ...prev, [roomId]: false }));
    } catch (error) {
      console.error("Error deleting room:", error);
      setError("Failed to delete room.");
      setDeleteLoading((prev) => ({ ...prev, [roomId]: false }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-base-100 py-6">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-auto">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
            <h2 className="text-xl font-semibold text-gray-700">All Rooms</h2>
            <Link
              to="/add-room"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Add Room
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Max People</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {rooms.map((room) => (
                  <tr
                    key={room._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {room.title}
                    </td>
                    <td className="py-3 px-6 text-left">{room.price}</td>
                    <td className="py-3 px-6 text-left">{room.maxPeople}</td>
                    <td className="py-3 px-6 text-left">
                      {room.desc.slice(0, 50)}
                    </td>

                    <td className="py-3 px-6 text-left flex ">
                      <Link
                        to={`/dashboard/rooms/edit-room/${room._id}`}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 transition duration-200"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(room._id, room._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                        disabled={deleteLoading[room._id]}
                      >
                        {deleteLoading[room._id] ? "Deleting..." : "Delete"}
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

export default AllRooms;
