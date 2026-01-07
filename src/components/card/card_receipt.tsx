import { useState } from "react";

import { Timestamp } from "@/hooks/useTimestamp";

import ProductCard from "components/card/card_product-receipt";

interface parameter {
   data: {
      total_price: number;
      receipt_data: any;
      paid_status: boolean;
      checkout_date: string;
   };
}

export default function Card({ data }: parameter) {
   const status = data.paid_status ? "SUCCESS" : "PENDING";
   const [isExpanded, setIsExpanded] = useState(false);
   const { date, time } = Timestamp(data.checkout_date);

   return (
      <div className={`w-75 p-3 gap-3 flex flex-col rounded-xl text-xl bg-(--color2)`}>
         <div className={`gap-2 flex flex-row allCenter`}>
            <div className={`px-2 pb-0.5 rounded-full ${data.paid_status ? "bg-green-500" : "bg-red-500"} `}>{status}</div>
            <div className={`text-lg`}>
               {date} {time}
            </div>
         </div>

         {isExpanded && (
            <div className={`gap-1 flex flex-col`}>
               {data.receipt_data.map((item: any) => (
                  <ProductCard key={item.product_id} data={item} />
               ))}
            </div>
         )}

         <hr />

         <div className={`flex flex-row gap-1`}>
            <div className={`grow font-bold`}>Total</div>
            <div>Rp {data.total_price}</div>
         </div>

         <div className={`gap-1 flex flex-col`}>
            <button className={`px-4 py-2 rounded ${data.paid_status ? "bg-green-500" : "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700"}`}>
               {data.paid_status ? "Show details" : "Pay now"}
            </button>
            <button className={`text-base allCenter`} onClick={() => setIsExpanded(!isExpanded)}>
               {isExpanded ? "▲ Collapse ▲" : "▼ Details ▼"}
            </button>
         </div>
      </div>
   );
}
