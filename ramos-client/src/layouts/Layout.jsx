import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="pt-24 px-4">
        <Outlet />
      </div>
    </>
  );
}