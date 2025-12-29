"use client";

import React, { useContext, useState } from "react";

import { useProductStore } from "@/store/useProduct";

interface parameterType {
   data: {
      product_id: string;
      name: string;
      price: number;
      url_image: string;
      availability: boolean;
   };
}

export default function Card({ data }: parameterType) {
   const products = useProductStore((state) => state.products);
   const [price, setPrice] = useState<number>(data.price);
   const [availability, setAvailability] = useState<boolean>(data.availability);
   const product_id = data.product_id;

   const isUnchanged = price === data.price && availability === data.availability;

   const updateProduct = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         const res = await fetch("/api/updateProduct", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ product_id, price, availability }),
         });
         // const result = await res.json();
         if (res.ok) {
            alert("Product updated successfully");
            // prettier-ignore
            setProduct((prev: any[]) =>
               prev.map((item) =>
                  item.product_id === product_id
                     ? {
                        ...item,
                        price,
                        availability,
                        quantity: availability ? item.quantity : 0,
                     }
                     : item
               )
            );
            if (!availability) {
               setCheckout((prev: any[]) => prev.filter((item) => item.product_id !== product_id));
            }
         }
      } catch (error) {
         console.error("Error updating product:", error);
      }
   };

   const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product/${data.url_image}`;

   return (
      <div className={`w-[300px] p-3 gap-3 flex flex-row rounded-xl bg-gray-700`}>
         <div className={`size-[130px] shrink-0 rounded-xl overflow-hidden relative`}>
            <img className={`w-full h-full object-cover`} src={imageURL} alt="" />
         </div>
         <form className={`flex flex-col gap-1`} onSubmit={updateProduct}>
            <div className={`font-bold text-xl`}>{data.name}</div>
            <div className={`flex flex-row gap-1`}>
               Rp
               <input
                  className={`w-full flex px-1 text-black`}
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
               />
            </div>
            <div className={`flex flex-row gap-2`}>
               <input type="checkbox" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
               Stock
            </div>

            <div className={`flex grow justify-end items-end`}>
               <button
                  className={`px-4 py-1 text-white rounded ${
                     isUnchanged ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 active:bg-green-700"
                  }`}
                  type="submit"
                  disabled={isUnchanged}
               >
                  UPDATE
               </button>
            </div>
         </form>
      </div>
   );
}
