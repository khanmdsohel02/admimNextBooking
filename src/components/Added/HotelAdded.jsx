import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const HotelAdded = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    photos: [],
    title: "",
    desc: "",
    rating: "",
    rooms: [],
    cheapestPrice: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRoomChange = (e, index) => {
    const { value } = e.target;
    const updatedRooms = formData.rooms.map((room, i) =>
      i === index ? value : room
    );
    setFormData((prev) => ({
      ...prev,
      rooms: updatedRooms,
    }));
  };

  const handleAddRoom = () => {
    setFormData((prev) => ({
      ...prev,
      rooms: [...prev.rooms, ""],
    }));
  };

  const handleRemoveRoom = (index) => {
    const updatedRooms = formData.rooms.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      rooms: updatedRooms,
    }));
  };

  const handlePhotosChange = (e) => {
    const photosArray = e.target.value.split(",").map((photo) => photo.trim());
    setFormData((prev) => ({
      ...prev,
      photos: photosArray,
    }));
  };

  const handleHotelAdded = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://nextbooking-ten.vercel.app/api/hotels",
        formData
      );
      console.log("Hotel added successfully:", response.data);
      toast.success("Hotel added successfully");
    } catch (error) {
      console.error(
        "Error adding hotel:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content lg:w-[80%]">
        <div className="card shrink-0 lg:w-[100%] shadow-2xl bg-base-100">
          <form onSubmit={handleHotelAdded} className="card-body">
            <h1 className="text-3xl font-bold text-center">Add Hotel</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Hotel Name</span>
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Hotel Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text"> Select Hotel Type</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="select select-bordered"
                required
              >
                <option selected value="hotel">
                  Hotel
                </option>
                <option value="apartment">Apartment</option>
                <option value="resort">Resort</option>
                <option value="villa">Villa</option>
                <option value="cabin">Cabin</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select City</span>
              </label>
              <select
                name="city"
                onChange={handleChange}
                className="select select-bordered"
                required
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Bandarban">Bandarban</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Kishoreganj">Kishoreganj</option>
                <option value="Pabna">Pabna</option>
                <option value="Narayanganj">Narayanganj</option>
                <option value="Khulna">Khulna</option>
                <option value="Barishal">Barishal</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Distance</span>
              </label>
              <input
                name="distance"
                type="text"
                value={formData.distance}
                onChange={handleChange}
                placeholder="Distance"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Photos (comma-separated URLs)
                </span>
              </label>
              <input
                name="photos"
                type="text"
                value={formData.photos.join(", ")}
                onChange={handlePhotosChange}
                placeholder="Photos"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
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
                <span className="label-text">Rating</span>
              </label>
              <input
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleChange}
                placeholder="Rating"
                className="input input-bordered"
                min="0"
                max="5"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rooms (comma-separated IDs)</span>
              </label>
              {formData.rooms.map((room, index) => (
                <div key={index} className="mb-2">
                  <input
                    name="rooms"
                    type="text"
                    value={room}
                    onChange={(e) => handleRoomChange(e, index)}
                    placeholder="Room ID"
                    className="input input-bordered mb-2"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveRoom(index)}
                    className="btn btn-secondary btn-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddRoom}
                className="btn btn-secondary btn-sm mt-2"
              >
                Add Room
              </button>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Featured</span>
                <input
                  name="featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="checkbox"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                name="cheapestPrice"
                type="number"
                value={formData.cheapestPrice}
                onChange={handleChange}
                placeholder="Price"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Add Hotel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelAdded;
