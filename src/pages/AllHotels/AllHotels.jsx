import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllHotels = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          "https://nextbooking-ten.vercel.app/api/hotels"
        );
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  const handleEdit = (hotelId) => {
    // Navigate to the edit page with the hotel ID
    navigate(`/dashboard/hotels/edit-hotel/${hotelId}`);
  };

  const handleDelete = async (hotelId) => {
    try {
      await axios.delete(
        `https://nextbooking-ten.vercel.app/api/hotels/${hotelId}`
      );
      setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Hotel List</h1>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cheapest Price
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <tr key={hotel._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{hotel.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{hotel.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{hotel.city}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {hotel.distance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hotel.rating}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hotel.cheapestPrice}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(hotel._id)}
                      className="btn btn-xs btn-primary mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(hotel._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No hotels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllHotels;
