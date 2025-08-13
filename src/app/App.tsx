import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function App() {
  return (
    <>
      <div className="bg-[#0E0F13] text-[#F5F7FA] ">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
