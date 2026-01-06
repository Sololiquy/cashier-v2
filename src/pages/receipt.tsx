import { useEffect } from "react";
import { useReceiptStore } from "@/store/useReceipt";

import Card from "components/card/card_receipt";

export default function Receipt() {
   const { receipt, fetchReceipt, loading } = useReceiptStore();

   useEffect(() => {
      fetchReceipt();
   }, []);

   return (
      <section className={`flex p-2 gap-4`}>
         {loading ? (
            <div className={`text-gray-400`}>Loading...</div>
         ) : receipt.length === 0 ? (
            <div className={`w-full h-full flex all-center text-gray-300 text-4xl tracking-widest`}>No receipts available</div>
         ) : (
            <div className={`p-3 gap-3 flex flex-wrap flex-row`}>
               {receipt.map((data) => (
                  <Card key={data.checkout_date} data={data} />
               ))}
            </div>
         )}
      </section>
   );
}
