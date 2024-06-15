import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const RoomAdded = () => {
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    maxPeople: "",
    desc: "",
    roomNumbers: [{ number: "", unavailableDates: [] }],
    hotelId: "", // New field for hotel ID
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoomChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRooms = formData.roomNumbers.map((room, i) =>
      i === index ? { ...room, [name]: value } : room
    );
    setFormData((prev) => ({
      ...prev,
      roomNumbers: updatedRooms,
    }));
  };

  const handleAddRoomNumber = () => {
    setFormData((prev) => ({
      ...prev,
      roomNumbers: [...prev.roomNumbers, { number: "", unavailableDates: [] }],
    }));
  };

  const handleRemoveRoomNumber = (index) => {
    const updatedRooms = formData.roomNumbers.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      roomNumbers: updatedRooms,
    }));
  };

  const handleRoomAdded = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://nextbooking-ten.vercel.app/api/rooms/${formData.hotelId}`,
        formData
      );
      console.log("Room added successfully:", response.data);
      toast.success("Room added successfully");
    } catch (error) {
      console.error(
        "Error adding room:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content lg:w-[80%]">
        <div className="card shrink-0 lg:w-[100%] shadow-2xl bg-base-100">
          <form onSubmit={handleRoomAdded} className="card-body">
            <h1 className="text-3xl font-bold text-center">Add Room</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Hotel</span>
              </label>
              <select
                name="hotelId"
                value={formData.hotelId}
                onChange={handleChange}
                className="input input-bordered"
                required
              >
                <option value="" disabled>
                  Select Hotel
                </option>
                {hotels.map((hotel) => (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Room Title</span>
              </label>
              <input
                name="title"
                type="text"
                value={formData.title}
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
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
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
                value={formData.maxPeople}
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
                value={formData.desc}
                onChange={handleChange}
                placeholder="Description"
                className="input input-bordered p-3 h-24"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Room Numbers</span>
              </label>
              {formData.roomNumbers.map((room, index) => (
                <div key={index} className="mb-2">
                  <input
                    name="number"
                    type="text"
                    value={room.number}
                    onChange={(e) => handleRoomChange(index, e)}
                    placeholder="Room Number"
                    className="input input-bordered mb-2"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveRoomNumber(index)}
                    className="btn btn-secondary btn-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddRoomNumber}
                className="btn btn-secondary btn-sm mt-2"
              >
                Add Room Number
              </button>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Add Room</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomAdded;
