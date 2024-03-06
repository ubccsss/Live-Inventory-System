import "../index.css";
import Navbar from "./Navbar";
const ShoppingList = () => {
  return (
    <div className="lightmode min-h-screen">
      <Navbar
        title="Shopping List"
        needbuttons={true}
        isofficerpage={false}
        needtitle={true}
      />
      <div className="text-white">hello!!</div>
    </div>
  );
};

export default ShoppingList;
