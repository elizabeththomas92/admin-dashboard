import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow dark:bg-gray-800 flex">
      <div className="container flex items-center justify-between py-6 mx-auto text-gray-300 ">
        <div
          className=" text-lg font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Admin Dashboard
        </div>
        <a href="/" className="text-gray-200 border-b-2 mx-1.5 sm:mx-6">
          Home
        </a>
      </div>
    </nav>
  );
}
