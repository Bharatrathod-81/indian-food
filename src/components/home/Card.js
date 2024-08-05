import { CartContext } from "@/utils/ContextReducer";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import ApiLoader from "../common/ApiLoader";

function Card(props) {
  const data = props.foodData;
  const [isLoading, setLoading] = useState(false);
  const { state, dispatch } = useContext(CartContext);
  const priceOptions = Object.keys(data.price);
  const [size, setSize] = useState(priceOptions[0]);
  const [qty, setQty] = useState(1);

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };
  const handleAddToCart = async () => {
    const updateItem = await state.find(
      (item) => item.tempId === data["_id"] + size
    );
    if (!updateItem) {
      dispatch({
        type: "ADD",
        id: data["_id"],
        tempId: data["_id"] + size,
        name: data.name,
        price: finalPrice,
        qty: qty,
        priceOption: size,
        img: data.img,
      });
    }
    if (updateItem) {
      dispatch({
        type: "UPDATE",
        tempId: data["_id"] + size,
        price: finalPrice,
        qty: qty,
      });
    }

    // console.log(state);
    //
  };

  const clickHandler = () => setLoading(true);

  let finalPrice = qty * parseInt(data.price[size]);

  return (
    <div className="box">
      {isLoading && <ApiLoader/>}
      <div className="w-80 rounded-lg bg-white overflow-hidden dark:bg-black border-gradient" onClick={clickHandler}>
        <Link href={{ pathname: "/Item/[item]" }} as={`Item/${data["_id"]}`} >
          <div className="relative w-full h-80">
            <Image src={data.img} layout="fill" objectFit="cover" alt="Indian Food" />
          </div>
          <div className="p-4">
            <div lassName="font-bold mb-2 text-xl uppercase"> {data.name}</div>
            <p className=" short_description text-gray-700 dark:text-gray-400 text-base">
              {data.description}
            </p>
          </div>
        </Link>
        <div className="flex px-4 justify-between">
          <select
            className=" h-100  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300  border border-black dark:border-gray-400 rounded"
            onChange={handleQty}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className=" h-100  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300  border border-black dark:border-gray-400 rounded"
            onChange={handleSize}
          >
            {priceOptions.map((options) => {
              return (
                <option className="uppercase" key={options} value={options}>
                  {options}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex p-4 font-bold  justify-between">
          <button
            onClick={handleAddToCart}
            className="border-2 dark:border-gray-400 border-[#d7615b] rounded p-2 hover:bg-[#d7615b] hover:text-gray-100 dark:text-gray-100"
          >
            Add to cart
          </button>
          <p className="p-2 text-xl">₹{finalPrice}/-</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
