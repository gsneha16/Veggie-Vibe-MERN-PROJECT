import { NavLink } from "react-router-dom";

const VeggieVibeHome = () => {
  return (
    <div className="bg-green-50 text-gray-800">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center bg-[url('/bg.png')] bg-cover bg-center">
        <div className="flex flex-col bg-green-500 bg-opacity-50 p-6 rounded-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            Healthy Food, Happy Mood🥦
          </h1>
          <p className="text-lg md:text-2xl font-semibold text-white mt-4">
            Fresh Veggies, Delivered with Love
          </p>
          <NavLink
            to="/store"
            className="mt-6 px-6 py-3 w-fit m-auto bg-yellow-500 hover:bg-yellow-600 font-semibold text-lg rounded-full"
          >
            Shop Now
          </NavLink>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 md:px-16 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Why VeggieVibe?
        </h2>

        <div className="flex flex-wrap justify-center gap-8 text-center">
          {[
            {
              icon: "🌿",
              title: "Farm Fresh",
              desc: "Directly sourced from local farmers.",
            },
            {
              icon: "🚚",
              title: "Fast Delivery",
              desc: "Same-day delivery for your convenience.",
            },
            {
              icon: "🌎",
              title: "Eco-Friendly",
              desc: "Sustainable and zero-waste packaging.",
            },
            {
              icon: "💚",
              title: "Affordable",
              desc: "Healthy eating shouldn't break the bank.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center max-w-[200px]"
            >
              <div className="text-green-500 text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-green-800 text-white text-center">
        <p>&copy; 2025 VeggieVibe. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VeggieVibeHome;
