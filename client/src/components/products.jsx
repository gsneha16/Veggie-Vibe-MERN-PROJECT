import React, { useRef } from "react";
import Card from "./card";

const products = () => {
  const sortRef = useRef(null);

  const sortProduct = (e) => {
    const sortId = e.target.id;
    console.log(sortId);
    const cardCont = Array.from(sortRef.current.children);
    cardCont.map((card) => {
      if (sortId == card.getAttribute("type")) {
        card.classList.remove("hidden");
      } else if (sortId == "Both") {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  };

  return (
    <>
      <h1 className="content text-center text-xl font-bold underline">Products</h1>
      <div className="flex flex-col items-center justify-center w-full  ">
        <div className="flex justify-between w-96 mt-5">
          <h2 className="font-bold text-lg">Category:</h2>
          <div className="flex items-center justify-center gap-5 text-lg">
            <div className="flex gap-1">
              <input
                type="radio"
                name="sort"
                id="Fruits"
                onChange={sortProduct}
                className="cursor-pointer"
              ></input>
              <label htmlFor="Fruits">Fruits</label>
            </div>

            <div className="flex gap-1">
              <input
                type="radio"
                name="sort"
                id="Veggie"
                onChange={sortProduct}
                className="cursor-pointer"
              ></input>
              <label htmlFor="Vegetables">Vegetables</label>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                name="sort"
                id="Both"
                onChange={sortProduct}
                className="cursor-pointer"
              ></input>
              <label htmlFor="Both">Both</label>
            </div>
          </div>
        </div>

        <div
          ref={sortRef}
          className=" mt-5 flex flex-wrap justify-center items-center gap-3 w-11/12"
        >
          <Card
            image="https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D"
            name="Apple"
            price="34"
            type="Fruits"
          />
          <Card
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxO3SprngUN8qjTp_noipuf8Rit1xsfMQzRw&s"
            name="Banana"
            price="50"
            type="Fruits"
          />

          <Card
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5QOM7dLzOofjnNeozvtQm0OgqAW2LU7nS3Q&s"
            name="Onion"
            price="40"
            type="Veggie"
          />
          <Card
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWm3ml8V2QKwT5Q1Er_7jLBUV9E4Ta6bBuiw&s"
            name="Tomato"
            price="60"
            type="Veggie"
          />
          <Card
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs-6JhsSCVhnO4n4R9y9XGBfMsfyIP11QyHg&s"
            name="Kiwi"
            price="60"
            type="Fruits"
          />
           <Card
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX1Nz50QcAa6M1YFnMevTBN_ou4O3_Y1jx6Q&s"
            name="Pomegranate"
            price="50"
            type="Fruits"
          />
          <Card
            image="https://fruitboxco.com/cdn/shop/products/broc_700x.png?v=1579753621"
            name="Brocolli"
            price="50"
            type="Veggie"
          />
          <Card
            image="https://cdn11.bigcommerce.com/s-kc25pb94dz/images/stencil/1280x1280/products/271/762/Carrot__40927.1634584458.jpg?c=2"
            name="Carrot"
            price="50"
            type="Veggie"
          />
          <Card
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43ggl9JyS_0XeKIcTtPdF9m3ukIYh_21kDA&s"
            name="Cauliflower"
            price="50"
            type="Veggie"
          />
          <Card
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbH7Uvw1O7ixFL66NfZ8g9B9YC-R7esc6Cvg&s"
            name="Orange"
            price="45"
            type="Fruits"
          />
         
        </div>
      </div>
    </>
  );
};

export default products;
