import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Card = (props) => {
  const [product, setProduct] = useState([]);

  const addToCart = async (image, name, price) => {
    const newProduct = { image, name, price };
    setProduct(newProduct);
    try {
      const response = await fetch("http://localhost:8000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newProduct),
      });
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
      } else if (result.error) {
        toast.error(
          result.error?.details[0]?.message || "Something went wrong"
        );
      } else {
        toast.error(result.message || "Failed to add to cart");
      }
    } catch (err) {
      console.log(err);
      toast.error("Network error while adding to cart");
    }
  };

  const addToWishlist = async (image, name, price) => {
    const newProduct = { image, name, price };
    setProduct(newProduct);
    try {
      const response = await fetch("http://localhost:8000/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newProduct),
      });
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
      } else if (result.error) {
        toast.error(
          result.error?.details[0]?.message || "Something went wrong"
        );
      } else {
        toast.error(result.message || "Failed to add to wishlist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Network error while adding to wishlist");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover
        theme="light"
      />
      <div
        type={props.type}
        className="w-[250px] h-[290px] border rounded-xl shadow-md p-3 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
      >
        {/* Image */}
        <div className="w-full h-[60%] overflow-hidden rounded-lg border">
          <img
            src={props.image}
            alt={props.name}
            name={props.type}
            onClick={(e) => console.log(e.target.name)}
            className="w-full h-full object-cover rounded-lg cursor-pointer hover:scale-105 transition duration-300"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-gray-800">{props.name}</p>
          <p className="text-sm text-gray-600">Price: {props.price} Rs/kg</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={() => addToCart(props.image, props.name, props.price)}
            className="bg-lime-700 hover:bg-lime-600 text-white font-semibold px-4 py-1 rounded-md transition duration-200"
          >
            Add to Cart
          </button>
          <button
            onClick={() => addToWishlist(props.image, props.name, props.price)}
            className="text-gray-600 hover:text-red-600 text-xl transition duration-200"
            title="Add to Wishlist"
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
