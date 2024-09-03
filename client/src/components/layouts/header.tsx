import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <>
      <div className="navbar bg-base-100 md:max-w-7xl mx-auto rounded-md border shadow-md">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl">
            JeffDB
          </Link>
        </div>
        <div className="navbar-end hidden md:flex">
            <Link to="/" className="btn btn-ghost text-lg">Users</Link>
            <Link to="/attendance" className="btn btn-ghost text-lg">Attendance</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
