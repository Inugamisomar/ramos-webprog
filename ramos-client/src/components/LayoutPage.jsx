import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function LayoutPage() {
  return (
    <div className="min-h-screen bg-[#02161b] text-white">

      <NavBar />

      <main className="w-full">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}