import { Link } from "react-router-dom";

const SidebarLinks = () => {
  return (
    <>
      <li>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/users">Users</Link>
        <Link to="/dashboard/hotels">All Hotels</Link>
        <Link to="/dashboard/rooms">All Rooms</Link>
        <Link to="/dashboard/add-hotel">Add Hotels</Link>
        <Link to="/dashboard/add-room">Add Rooms</Link>
      </li>
    </>
  );
};

export default SidebarLinks;
