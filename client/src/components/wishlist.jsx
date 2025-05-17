import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { BsBagHeart } from "react-icons/bs";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = localStorage.getItem("LoggedInUser");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/wishlist/${user}`);
      const result = await response.json();
      setWishlist(result.products);

      if (result.success) {
        toast.success(result.message);
      } else if (result.error) {
        toast.error(
          result.error?.details[0]?.message || "Something went wrong"
        );
      } else {
        toast.error(result.message || "Failed to load wishlist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Network error while fetching wishlist");
    }
  };

  const removeWishlistElement = async (e, id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/wishlist/${user}/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setWishlist((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(result.error || "Failed to remove item");
      }
    } catch (err) {
      console.log(err);
      toast.error("Network error while removing item");
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col justify-center items-center space-y-4 text-center">
        <BsBagHeart className="text-7xl text-orange-400 animate-pulse" />
        <h2 className="text-xl font-semibold text-gray-700">
          Your Wishlist is{" "}
          <span className="text-red-600 font-bold">Empty!</span>
        </h2>
        <p className="text-gray-500">Create your first wishlist item</p>
        <NavLink
          to="/store"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-300"
        >
          + Create New Wish
        </NavLink>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        pauseOnHover
        theme="light"
      />
      <div className="content w-11/12 mx-auto flex flex-col justify-center items-center pt-10 gap-6">
        <h2 className="text-3xl font-semibold text-gray-800">Your Wishlist</h2>

        <div className="flex flex-wrap justify-center pt-5 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="relative w-[220px] rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-3 bg-white flex justify-between items-center">
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-green-600 font-semibold">
                  {item.price} Rs.
                </p>
              </div>
              <button
                onClick={(e) => removeWishlistElement(e, item._id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-1.5 shadow-lg transition duration-200"
                title="Remove"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
