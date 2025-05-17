import React, { useRef, useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const OrderHistory = () => {
  const user = localStorage.getItem("LoggedInUser");
  const [orderHistory, setOrderHistory] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const heightRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/orderHistory/${user}`
      );
      const result = await response.json();
      setOrderHistory(result.orderHistory || []);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
    heightRef.current.className = expanded
      ? "h-56 overflow-hidden transition-all duration-300 flex flex-wrap gap-6"
      : "h-fit overflow-hidden transition-all duration-300 flex flex-wrap gap-6";
  };

  return (
    <div className="content p-6 bg-gray-50 w-3/4 m-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Order History
      </h2>

      <div className="transition-all duration-300 flex flex-col md:flex-row items-center justify-center gap-6 h-fit">
        {orderHistory.map((orders) => (
          <div
            // ref={heightRef}
            key={orders._id}
            className="h-fit overflow-hidden  bg-white shadow-lg rounded-2xl p-4 space-y-4 md:min-h-[450px]  min-w-[360px]"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Order ID:</p>
                <p className="text-sm font-medium text-gray-800">
                  {orders._id}
                </p>
              </div>
              {/* <button
                onClick={toggleExpand}
                className="flex items-center gap-2 text-blue-600 text-sm"
              >
                {expanded ? "Show Less" : "Show More"}
                {expanded ? <FaAngleUp /> : <FaAngleDown />}
              </button> */}
            </div>

            <div>
              <p className="text-xs text-gray-500">Email:</p>
              <p className="text-sm font-medium text-gray-800">
                {orders.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Shipping Address:</p>
              <p className="text-sm font-medium text-gray-800">
                {orders.address}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Order Status:</p>
              <span
                className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                  orders.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {orders.status}
              </span>
            </div>

            <div>
              <p className="text-xs text-gray-600 mb-1">Ordered Items:</p>
              <div className="flex flex-col gap-1">
                {orders.orders.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between bg-gray-100 px-3 py-1.5 rounded border border-gray-200"
                  >
                    <div className="text-sm text-gray-800 truncate w-1/2">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      Qty: {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t text-sm font-medium text-gray-700 flex justify-between">
              <span>Total Payment:</span>
              <span className="text-green-700 font-semibold">
                ₹
                {orders.orders.reduce((acc, item) => acc + item.totalAmount, 0)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
