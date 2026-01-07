import React from "react";
import { useCheckoutStore } from "@/store/useCheckout";
import { useLanguageStore } from "@/store/useLanguage";

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
   const text = useLanguageStore((state) => state.text);
   const add = useCheckoutStore((state) => state.add);
   const remove = useCheckoutStore((state) => state.remove);
   const quantity = useCheckoutStore((state) => state.getQuantity(data.product_id));
   const imageURL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product/${data.url_image}`;

   return (
      <div className={`w-60 p-3 gap-2 flex flex-col rounded-xl bg-(--color2)`}>
         <div className={`aspect-square rounded-xl overflow-hidden text-2xl relative`}>
            <img className={`w-full h-full object-cover`} src={imageURL} alt="" />
            {!data.availability ? (
               <div className={`availabilityNotification h-10 px-4 text-white bg-gray-800`}>{text.empty}</div>
            ) : quantity > 0 ? (
               <div className={`availabilityNotification size-10 font-bold text-white bg-red-500`}>{quantity}</div>
            ) : null}
         </div>

         <div className={`font-bold text-2xl`}>{data.name}</div>

         <div className={`flex flex-row gap-1`}>
            {data.availability && (
               <div className={`flex gap-1 text-lg `}>
                  <button
                     onClick={quantity > 0 ? () => remove(data.product_id) : undefined}
                     className={`quantityProductButton ${quantity === 0 ? "cursor-not-allowed bg-gray-500" : "bg-red-500 "} `}
                  >
                     -
                  </button>

                  <button onClick={() => add(data.product_id)} className={`quantityProductButton bg-green-500 `}>
                     +
                  </button>
               </div>
            )}

            <div className={`px-1 grow text-right text-xl`}>Rp {new Intl.NumberFormat("id-ID").format(data.price)}</div>
         </div>
      </div>
   );
}
