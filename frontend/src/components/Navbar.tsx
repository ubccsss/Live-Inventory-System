import "../index.css";
import { Link } from "react-router-dom";
interface NavbarProps {
  title: string;
  needbuttons: boolean;
  isofficerpage: boolean;
}

const Navbar = ({ title, needbuttons, isofficerpage }: NavbarProps) => {
  return (
    <div className={isofficerpage ? "darkmode" : "lightmode"}>
      {needbuttons && (
        <div className="flex justify-end right-4 p-4 text-black-700">
          <Link
            to="/officer/mainmenu"
            className={isofficerpage ? "btn-o mr-4" : "btn-c mr-4"}
          >
            Back to Main
          </Link>

          <Link to="/officer" className={isofficerpage ? "btn-o" : "btn-c"}>
            Logout
          </Link>
        </div>
      )}
      <div className="relative top-15 text-center text-6xl ">{title}</div>
      <hr
        className="
            h-px 
            my-6
            bg-white 
            border-1
            w-4/5
            mx-auto"
      />
    </div>
  );
};

export default Navbar;
