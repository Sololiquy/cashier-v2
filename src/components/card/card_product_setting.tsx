import { useState } from "react";

import { useProductStore } from "@/store/useProduct";

interface Parameter {
   data: {
      product_id: string;
      name: string;
      price: number;
      url_image: string;
      availability: boolean;
   };
}

export default function Card({ data }: Parameter) {
   const updateProduct = useProductStore((s) => s.update);
   const [price, setPrice] = useState<number>(data.price);
   const [availability, setAvailability] = useState<boolean>(data.availability);
   const [submitting, setSubmitting] = useState(false);
   const imageURL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product/${data.url_image}`;

   const isUnchanged = price === data.price && availability === data.availability;

   const update = async (e: React.FormEvent) => {
      e.preventDefault();
      if (isUnchanged || submitting) return;

      try {
         setSubmitting(true);
         await updateProduct(data.product_id, price, availability);
         alert("Product updated successfully");
      } catch (err) {
         console.error(err);
         alert("Failed to update product");
      } finally {
         setSubmitting(false);
      }
   };

   return (
      <div className={`h-45 p-3 gap-3 flex flex-row rounded-xl bg-(--color2)`}>
         <div className={`aspect-square rounded-xl overflow-hidden`}>
            <img className={`w-full h-full object-cover`} src={imageURL} alt="" />
         </div>

         <form className={`gap-2 flex flex-col `} onSubmit={update}>
            <div className={`text-3xl font-bold`}>{data.name}</div>
            <div>
               <div className={`flex flex-row gap-1 `}>
                  Rp.
                  <input className={`w-40 px-1`} type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
               </div>
               <div className={`flex flex-row gap-2`}>
                  <input type="checkbox" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
                  Stock
               </div>
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
