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
import NextBooking from "../components/NextBooking";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <NextBooking />
          </PrivateRoute>
        ),
      },
      {
        path: "/users",
        element: <AllUsers />,
      },
      {
        path: "/hotels",
        element: <AllHotels />,
      },
      {
        path: "/rooms",
        element: <AllRooms />,
      },
      {
        path: "/add-hotel",
        element: <HotelAdded />,
      },
      {
        path: "/add-room",
        element: <RoomAdded />,
      },
      {
        path: "/edit-hotel/:id",
        element: <EditHotel />,
      },
      {
        path: "/edit-room/:id",
        element: <EditRoom />,
      },
      {
        path: "/edit-user/:id",
        element: <UserEdit />,
      },
    ],
  },
  {
    path: "nextbooking/admin/register",
    element: <Register />,
  },
  {
    path: "nextbooking/admin/login",
    element: <Login />,
  },
  {
    path: "*",
    element: (
      <div className="text-3xl font-bold grid items-center">Page Not Found</div>
    ),
  },
]);
