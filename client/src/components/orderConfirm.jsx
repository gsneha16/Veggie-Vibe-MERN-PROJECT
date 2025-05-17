import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [orders, setorders] = useState();
  const navigate = useNavigate();

  const user = localStorage.getItem("LoggedInUser");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const url = `https://veggie-vibe-api.vercel.app/cart/order/${user}`;
      const response = await fetch(url);
      const result = await response.json();
      setorders(result.orders);
    } catch (err) {
      console.log(err);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    console.log(orders);

    try {
      const url = `https://veggie-vibe-api.vercel.app/orderHistory`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const options = ["RazorPay", "cash on delivery"];
  const selectedOptions = watch("options");

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="mt-[60px] bg-gray-100 py-5 flex items-center">
        <div className=" bg-white border-2 w-3/5 h-fit mx-auto flex flex-col items-center justify-center py-3 rounded-xl ">
          <div>
            <h1 className="text-center font-bold text-xl">Order Summary</h1>
            <table className="w-full mx-auto my-5 border-2">
              <thead>
                <tr className="text-gray-600 border-b-2 ">
                  <th className="px-5 py-2">Product</th>
                  <th className="px-5 py-2">Quantity</th>
                  <th className="px-5 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((item, index) => {
                  return (
                    <tr key={index} className="text-center border-b-2 ">
                      <td className="px-5 py-2">{item.name}</td>
                      <td className="px-5 py-2">{item.quantity}</td>
                      <td className="px-5 py-2">₹{item.price}/Kg</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="text-start">
                <tr>
                  <td className="px-5 py-2" colSpan={2}>
                    Sub Total
                  </td>
                  <td className="px-5 py-2">
                    ₹
                    {orders?.reduce((acc, item) => {
                      return acc + item.totalAmount;
                    }, 0)}
                  </td>
                </tr>
                <tr className="border-b-2">
                  <td className="px-5 py-2 " colSpan={2}>
                    Shipping
                  </td>
                  <td className="px-5 py-2">Free</td>
                </tr>
                <tr className="font-semibold">
                  <td className="p-2 " colSpan={2}>
                    Total Amount
                  </td>
                  <td className="p-2">
                    ₹
                    {orders?.reduce((acc, item) => {
                      return acc + item.totalAmount;
                    }, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex gap-2">
              <label htmlFor="address" className="w-40">
                Shipping Address:{" "}
              </label>
              <input
                defaultValue=""
                {...register("address", { required: true })}
                className="border-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <p className="w-40">Select Payment Mode: </p>
                <div className="flex flex-col">
                  {options.map((option) => (
                    <div key={option}>
                      <label>
                        <input
                          type="checkbox"
                          value={option}
                          {...register("options")}
                        />{" "}
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex gap-2">
                  <p className="w-40">Selected options:</p>
                  {selectedOptions?.length === 1 ? (
                    <p key={selectedOptions}>{selectedOptions}</p>
                  ) : (
                    <p>Select one Payment Mode</p>
                  )}
                </div>
              </div>
            </div>

            {errors.exampleRequired && <span>This field is required</span>}

            <input
              type="submit"
              className="px-2 py-1 bg-green-600 rounded-lg text-white w-fit mx-auto cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
}
