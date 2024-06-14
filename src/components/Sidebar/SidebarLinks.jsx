import { Link } from "react-router-dom";

const SidebarLinks = () => {
  return (
    <>
      <li>
        <Link to="/">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/hotels">All Hotels</Link>
        <Link to="/rooms">All Rooms</Link>
        <Link to="/add-hotel">Add Hotels</Link>
        <Link to="/add-room">Add Rooms</Link>
      </li>
    </>
  );
};

export default SidebarLinks;
