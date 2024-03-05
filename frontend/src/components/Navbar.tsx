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
          <Link to="/officer/mainmenu" className="btn-o">
            Back to Main
          </Link>

          <Link to="/officer" className="btn-o">
            Logout
          </Link>
        </div>
      )}
      <div className="relative top-15 text-center text-6xl ">{title}</div>
      <hr
        className={
          isofficerpage
            ? "h-px my-6 bg-white border-1 w-4/5 mx-auto"
            : "h-px my-6 bg-black border-1 w-4/5 mx-auto"
        }
      />
    </div>
  );
};

export default Navbar;
