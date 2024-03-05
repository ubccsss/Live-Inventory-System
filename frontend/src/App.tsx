import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navbar
              title="Catalogue"
              needbuttons={false}
              isofficerpage={false}
            />
          }
        />
        <Route
          path="/store"
          element={
            <Navbar title="Login" needbuttons={true} isofficerpage={false} />
          }
        />
        <Route
          path="/officer"
          element={
            <Navbar title="Login" needbuttons={false} isofficerpage={true} />
          }
        />
        <Route
          path="/officer/mainmenu"
          element={
            <Navbar title="Login" needbuttons={true} isofficerpage={true} />
          }
        />
        <Route
          path="/officer/itemdetail/:id"
          element={
            <Navbar title="Login" needbuttons={true} isofficerpage={true} />
          }
        />
        <Route
          path="/officer/reimburse"
          element={
            <Navbar title="Login" needbuttons={true} isofficerpage={true} />
          }
        />
        <Route
          path="/officer/inventory"
          element={
            <Navbar title="Login" needbuttons={true} isofficerpage={true} />
          }
        />
        <Route
          path="/officer/shoppinglist"
          element={
            <Navbar title="Login" needbuttons={true} isofficerpage={true} />
          }
        />
        <Route
          path="/officer/additem"
          element={
            <Navbar title="Login" needbuttons={true} isofficerpage={true} />
          }
        />
        <Route
          path="/officer/transaction"
          element={
            <Navbar title="Login" needbuttons={true} isofficerpage={true} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
