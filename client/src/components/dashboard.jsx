import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaShoppingCart, FaHeart, FaCog, FaBoxOpen } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    signIndate: "",
    profileImg: "",
  });

  const navigate = useNavigate();

  const currUser = localStorage.getItem("LoggedInUser");

  useEffect(() => {
    if (currUser) {
      handleProfileUpdate();
    } else {
      navigate("/login");
    }
  }, []);

  const handleProfileUpdate = async () => {
    const url = `http://localhost:8000/profileUpdate/${currUser}`;
    const response = await fetch(url);
    const result = await response.json();
    const email = result.email;
    const date = result.date;
    console.log(result)
    const profileUrl = result.profileImg;
    setUser({
      name: currUser,
      email: email,
      signIndate: date,
      profileImg: profileUrl,
    });
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profilePic", file);
    formData.append("username", user.name); // Send userId to backend

    try {
      const res = await axios.post(
        `http://localhost:8000/profileUpdate/${currUser}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        handleProfileUpdate();
      } else {
        toast.error(res.message);
        console.log(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged Out successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      <div className="content min-h-screen bg-gray-100 px-4 py-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-center flex-wrap border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              👋 Hey, {user.name || "User"}!
            </h1>
            <button
              onClick={handleLogout}
              className="mt-4 sm:mt-0 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition duration-200"
            >
              Logout
            </button>
          </div>

          {/* Profile Card */}
          <div className="flex sm:flex-row bg-white shadow-lg rounded-2xl p-6 gap-6 items-center sm:items-start border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <img
              className="w-28 h-28 rounded-full border-4 border-gray-500 shadow-md object-cover"
              src={user.profileImg || "./defaultAvtar.png"}
              alt="Profile"
            />

            <div className="flex flex-col items-center sm:items-start gap-4 w-full sm:w-fit">
              <div className="flex flex-col gap-2 items-start sm:items-start">
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-400">{user.signIndate}</p>
              </div>

              <div className="flex gap-3">
                <div className="relative inline-block">
                  <button
                    type="button"
                    className=" cursor-pointer px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md transition"
                  >
                    Edit Profile
                  </button>
                  <input
                    type="file"
                    name="profilePic"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                <button
                  onClick={handleUpload}
                  className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-4">
            <NavCard
              to="/orderHistory"
              icon={<FaBoxOpen />}
              label="Order History"
            />
            <NavCard to="/cart" icon={<FaShoppingCart />} label="Your Cart" />
            <NavCard to="/wishlist" icon={<FaHeart />} label="Your Wishlist" />
            <NavCard to="/settings" icon={<FaCog />} label="Settings" />
          </div>
        </div>
      </div>
    </>
  );
};

// Navigation Button
const NavCard = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-200 w-full sm:w-[48%] md:w-[23%]"
  >
    <div className="text-blue-600">{icon}</div>
    <span className="font-medium text-gray-700">{label}</span>
  </NavLink>
);

export default Dashboard;
