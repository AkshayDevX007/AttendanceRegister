import { Link } from "@tanstack/react-router";
import MobileNav from "./mobileNav";

const Header = () => {
  return (
    <>
      <div className="navbar px-4 bg-base-100 rounded-md border shadow-md w-full">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl font-robotoSlab">
            Jy.KallurWest
          </Link>
        </div>
        <div className="navbar-end hidden md:flex">
            <Link to="/" className={`btn btn-ghost text-lg font-robotoSlab font-bold`} activeProps={() => ({ className: "underline" })}>Users</Link>
            <Link to="/attendance" className={`btn btn-ghost text-lg font-robotoSlab font-bold`} activeProps={ () => ({ className: "underline" })}>Attendance</Link>
        </div>
      </div>
      <MobileNav />
    </>
  );
};

export default Header;
