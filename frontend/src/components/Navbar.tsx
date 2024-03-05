import "../index.css";
import { Link } from "react-router-dom";
interface NavbarProps {
  title: string;
  needbuttons: boolean;
}

const Navbar = ({ title, needbuttons }: NavbarProps) => {
  return (
    <div className="darkmode">
      {needbuttons && (
        <div className="flex justify-end right-4 p-4 text-black-700">
          <Link to="/officer/mainmenu" className="btn mr-4">
            Back to Main
          </Link>

          <Link to="/officer" className="btn">
            Logout
          </Link>
        </div>
      )}
      <div className="relative top-15 text-center text-6xl text-white">
        {title}
      </div>
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
