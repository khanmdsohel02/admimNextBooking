import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaCircleXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const EditHotel = () => {
  const [hotel, setHotel] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    photos: [],
    title: "",
    desc: "",
    rating: 0,
    cheapestPrice: 0,
    featured: false,
  });
  const [fetchedHotel, setFetchedHotel] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(
          `https://nextbooking-ten.vercel.app/api/hotels/${id}`
        );
        setFetchedHotel(response.data);
        setHotel(response.data); // Setting hotel state with fetched data
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotel();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHotel((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://nextbooking-ten.vercel.app/api/hotels/${id}`,
        hotel
      );
      navigate("/hotels");

      toast.success("Hotel updated successfully");
    } catch (error) {
      console.error("Error updating hotel data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center">
      <div className="container mx-auto p-4">
        <div className="bg-base-100 p-4 rounded-lg shadow-lg w-full lg:max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Edit Hotel</h1>

            <FaCircleXmark
              onClick={() => navigate("/hotels")}
              className="w-6 h-6  cursor-pointer text-red-500 hover:scale-110"
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Hotel Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={fetchedHotel?.name}
                  onChange={handleChange}
                  placeholder="Hotel Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Hotel Type</span>
                </label>
                <input
                  name="type"
                  type="text"
                  defaultValue={fetchedHotel?.type}
                  onChange={handleChange}
                  placeholder="Hotel Type"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">City</span>
                </label>
                <input
                  name="city"
                  type="text"
                  defaultValue={fetchedHotel?.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  name="address"
                  type="text"
                  defaultValue={fetchedHotel?.address}
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
                  defaultValue={fetchedHotel?.distance}
                  onChange={handleChange}
                  placeholder="Distance"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photos</span>
                </label>
                <input
                  name="photos"
                  type="text"
                  defaultValue={fetchedHotel?.photos?.join(",")}
                  onChange={(e) =>
                    setHotel({ ...hotel, photos: e.target.value.split(",") })
                  }
                  placeholder="Photos (comma separated URLs)"
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
                  defaultValue={fetchedHotel?.title}
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
                  defaultValue={fetchedHotel?.desc}
                  onChange={handleChange}
                  placeholder="Description"
                  className="textarea textarea-bordered"
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
                  min="0"
                  max="5"
                  defaultValue={fetchedHotel?.rating}
                  onChange={handleChange}
                  placeholder="Rating"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  name="cheapestPrice"
                  type="number"
                  defaultValue={fetchedHotel?.cheapestPrice}
                  onChange={handleChange}
                  placeholder="Price"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Featured</span>
                  <input
                    name="featured"
                    type="checkbox"
                    checked={hotel.featured}
                    onChange={handleChange}
                    className="checkbox"
                  />
                </label>
              </div>
            </div>
            <div className="form-control mt-6">
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

export default EditHotel;
