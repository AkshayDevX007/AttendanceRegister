import { Link } from "@tanstack/react-router";
import { GiHeavyHelm } from "react-icons/gi";
import { GiAbstract114 } from "react-icons/gi";

const MobileNav = () => {
  return (
    <>
      <div className="btm-nav md:hidden z-10">
        <Link to="/">
          <button className="flex flex-col items-center">
            <GiHeavyHelm className="h-5 w-5" />
            <span className="btm-nav-label font-robotoSlab font-semibold">
              Users
            </span>
          </button>
        </Link>
        <Link to="/attendance">
          <button className="flex flex-col items-center">
            <GiAbstract114 className="h-5 w-5" />
            <span className="btm-nav-label font-robotoSlab font-semibold">
              Attendance
            </span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default MobileNav;
