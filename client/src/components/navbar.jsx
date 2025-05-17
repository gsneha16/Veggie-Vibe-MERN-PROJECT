import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-green-700/80 shadow-md flex justify-between items-center h-[68px] px-6">
      {/* Logo & Home */}
      <div className="flex items-center gap-4">
        <NavLink to="/home">
          <i className="fa-solid fa-house cursor-pointer text-2xl text-white hover:text-yellow-400 hover:scale-110 transition-all"></i>
        </NavLink>
        <h1 className="font-bold text-3xl text-white tracking-wide">
          <span className="text-yellow-300">Veggie</span>
          <span className="text-white">Vibe</span>
        </h1>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-white rounded-full shadow-inner overflow-hidden w-[40%] max-w-md">
        <input
          type="search"
          className="px-4 py-2 w-full text-black outline-none text-sm placeholder-gray-500"
          placeholder="Search fresh veggies..."
        />
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 font-semibold transition-all">
          Search
        </button>
      </div>

      {/* Icons */}
      <ul className="flex gap-6 text-white text-xl">
        <NavLink to="/store">
          <li className="cursor-pointer hover:text-orange-400 hover:scale-110 transition-all">
            <i className="fa-solid fa-store"></i>
          </li>
        </NavLink>
        <NavLink to="/wishlist">
          <li className="cursor-pointer hover:text-pink-400 hover:scale-110 transition-all">
            <i className="fa-regular fa-heart"></i>
          </li>
        </NavLink>
        <NavLink to="/cart">
          <li className="cursor-pointer hover:text-yellow-400 hover:scale-110 transition-all">
            <i className="fa-solid fa-cart-shopping"></i>
          </li>
        </NavLink>
        <NavLink to="/">
          <li className="cursor-pointer hover:text-blue-400 hover:scale-110 transition-all">
            <i className="fa-regular fa-user"></i>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
