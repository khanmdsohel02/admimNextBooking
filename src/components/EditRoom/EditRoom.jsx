import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCircleXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    title: "",
    price: 0,
    maxPeople: 0,
    desc: "",
    roomNumbers: [{ number: 0, unavailableDates: [] }],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedRoom, setFetchedRoom] = useState(null); // State to store fetched room data

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://nextbooking-ten.vercel.app/rooms/${id}`
        );
        setFetchedRoom(response.data); // Store fetched room data in state
        setRoom(response.data); // Initialize form with fetched room data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room data:", error);
        setError("Failed to fetch room data.");
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "number" || name === "unavailableDates") {
      const index = e.target.getAttribute("data-index");
      const updatedRoomNumbers = [...room.roomNumbers];
      updatedRoomNumbers[index][name] = type === "checkbox" ? checked : value;
      setRoom((prevRoom) => ({
        ...prevRoom,
        roomNumbers: updatedRoomNumbers,
      }));
    } else {
      setRoom((prevRoom) => ({
        ...prevRoom,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`https://nextbooking-ten.vercel.app/rooms/${id}`, room);
      setLoading(false);
      navigate("/rooms"); // Redirect to home page after successful update
      toast.success("Room updated successfully");
    } catch (error) {
      console.error("Error updating room data:", error);
      setError("Failed to update room data.");
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-base-100 flex justify-center items-center">
      <div className="container mx-auto p-4">
        <div className="bg-base-200 p-4 rounded-lg shadow-md w-full md:max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Edit Room</h1>
            <FaCircleXmark
              onClick={() => navigate("/rooms")}
              className="w-6 h-6  cursor-pointer text-red-500 hover:scale-110"
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  name="title"
                  type="text"
                  value={room.title}
                  onChange={handleChange}
                  placeholder="Room Title"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  name="price"
                  type="number"
                  value={room.price}
                  onChange={handleChange}
                  placeholder="Room Price"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Max People</span>
                </label>
                <input
                  name="maxPeople"
                  type="number"
                  value={room.maxPeople}
                  onChange={handleChange}
                  placeholder="Max People"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="desc"
                  value={room.desc}
                  onChange={handleChange}
                  placeholder="Room Description"
                  className="textarea textarea-bordered"
                  required
                />
              </div>
              <div className="form-control col-span-2">
                <label className="label">
                  <span className="label-text">Room Numbers</span>
                </label>
                {room.roomNumbers.map((roomNumber, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <input
                      name="number"
                      type="number"
                      value={roomNumber.number}
                      onChange={handleChange}
                      data-index={index}
                      placeholder="Room Number"
                      className="input input-bordered w-1/2"
                      required
                    />
                    <input
                      name="unavailableDates"
                      type="text"
                      value={roomNumber.unavailableDates.join(", ")}
                      onChange={handleChange}
                      data-index={index}
                      placeholder="Unavailable Dates (comma separated)"
                      className="input input-bordered w-1/2"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
