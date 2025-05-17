import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BsCartX } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const cart = () => {
  const [cart, setCart] = useState([]);
  const [order, setorder] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const user = localStorage.getItem("LoggedInUser");

  const fetchData = async () => {
    try {
      const url = `http://localhost:8000/cart/${user}`;
      const response = await fetch(url);
      const result = await response.json();
      setCart(result.products);
      cartToOrder(result.products);

      if (result.success) {
        toast.success(result.message);
      } else if (result.error) {
        toast.error(result.error?.details[0].message);
      } else if (!result.success) {
        toast.error(result.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (e, currId, name) => {
    const response = await fetch(
      `http://localhost:8000/cart/${user}/${currId}/${name}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.error);
    }

    setCart(cart.filter((item) => item.id !== currId));
    await fetchData();
  };

  // handle qunatity update increment and decrement
  const updateQuantity = async (id, type) => {
    try {
      const url = `http://localhost:8000/cart/${type}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  // post cart data to order
  const cartToOrder = async (myCart) => {
    try {
      const url = `http://localhost:8000/cart/order/${user}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(),
      });
      const result = await response.json();
      if (result.success) {
        // toast.success(result.message);
      }
    } catch (err) {
      console.log(err);
    }
    fetchOrders();
  };

  const fetchOrders = async () => {
    try {
      const url = `http://localhost:8000/cart/order/${user}`;
      const response = await fetch(url);
      const result = await response.json();
      setorder(result.orders);
    } catch (err) {
      console.log(err);
    }
  };

  if (cart?.length === 0) {
    return (
      <div className="content w-3/4 h-60 m-auto flex flex-col justify-evenly items-center">
        <BsCartX className="text-7xl" />
        <div className="text-lg">
          Your Cart is <span className="text-red-600 font-bold">Empty!</span>
        </div>
        <p>Add Something to make me happy :)</p>
        <NavLink
          to="/store"
          className="bg-blue-500 px-1 py-1.5 text-white rounded-md"
        >
          Continue Shopping
        </NavLink>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="content w-[60vw] mx-auto lg:flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-4 w-3/4 mx-auto">
          {cart?.map((items) => (
            <div
              key={items._id}
              className="flex items-center gap-10 border-2 p-2 w-[380px] rounded-lg"
            >
              <img
                className="rounded-2xl w-40 h-40 object-center"
                src={items.image}
              />
              <div className="flex flex-col gap-3">
                <p className="font-semibold">{items.name}</p>
                <p> ₹{items.price}/kg.</p>

                <div className="flex items-center justify-evenly border-2 h-8 w-24">
                  <p
                    className="border-r-2 w-full h-full text-center font-semibold cursor-pointer text-lg"
                    onClick={() => {
                      updateQuantity(items._id, "decrement");
                    }}
                  >
                    -
                  </p>
                  <p className="border-r-2 w-full h-full text-center font-semibold cursor-pointer text-lg">
                    {items.quantity}
                  </p>
                  <p
                    className="w-full h-full text-center font-semibold cursor-pointer text-lg"
                    onClick={() => {
                      updateQuantity(items._id, "increment");
                    }}
                  >
                    +
                  </p>
                </div>

                <p>Total Price: ₹{items.price * items.quantity}</p>

                <div>
                  <button
                    className="bg-red-700 text-white px-1 rounded-md font-semibold"
                    onClick={(e) => {
                      deleteProduct(e, items._id, items.name);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* order */}
        <div className="w-full lg:w-1/3 p-4 border rounded-md shadow-sm bg-white mt-8 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Order Summary
          </h2>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {order?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-1 border-b"
              >
                <div className="flex flex-col w-2/3">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-xs text-gray-500">
                    ₹{item.price}/kg × {item.quantity}kg
                  </span>
                </div>
                <span className="font-semibold text-right w-1/3">
                  ₹{item.totalAmount}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-semibold mt-4 pt-2 border-t">
            <span>Total Amount</span>
            <span className="text-green-700">
              ₹{order.reduce((acc, item) => acc + item.totalAmount, 0)}
            </span>
          </div>

          <NavLink
            to="/orderConfirm"
            className="mt-4 block text-center w-fit bg-green-600 hover:bg-green-700 text-white font-medium p-2 rounded-md transition self-end"
          >
            Place Order
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default cart;
