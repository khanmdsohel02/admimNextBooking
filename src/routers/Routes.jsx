import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import AllUsers from "../pages/AllUsers/AllUsers";
import AllHotels from "../pages/AllHotels/AllHotels";
import AllRooms from "../pages/AllRooms/AllRooms";
import HotelAdded from "../components/Added/HotelAdded";
import RoomAdded from "../components/Added/RoomAdded";
import EditHotel from "../components/EditHotel/EditHotel";
import EditRoom from "../components/EditRoom/EditRoom";
import UserEdit from "../components/UserEdit/UserEdit";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import NextBooking from "../components/NextBooking";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/admin/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <NextBooking />,
      },
      {
        path: "/dashboard/users",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/hotels",
        element: <AllHotels />,
      },
      {
        path: "/dashboard/rooms",
        element: <AllRooms />,
      },
      {
        path: "/dashboard/add-hotel",
        element: <HotelAdded />,
      },
      {
        path: "/dashboard/add-room",
        element: <RoomAdded />,
      },
      {
        path: "/dashboard/hotels/edit-hotel/:id",
        element: <EditHotel />,
      },
      {
        path: "/dashboard/rooms/edit-room/:id",
        element: <EditRoom />,
      },
      {
        path: "/dashboard/user/edit-user/:id",
        element: <UserEdit />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="text-3xl font-bold grid items-center">Page Not Found</div>
    ),
  },
]);
