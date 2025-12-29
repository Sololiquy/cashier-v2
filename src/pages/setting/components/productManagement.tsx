import React, { useContext } from "react";

import { useProductStore } from "@/store/useProduct";

import Card from "components/card/card_product_edit";

export default function ProductManagement() {
   const products = useProductStore((state) => state.products);

   const filteredProducts = products.sort((a: any, b: any) => a.name.localeCompare(b.name));

   return (
      <>
         <div className={`flex gap-3 flex-col`}>
            <div className={`text-2xl`}>Product Management Setting</div>
            <div className={`gap-3 flex flex-row flex-wrap`}>
               {filteredProducts.map((item: any) => (
                  <Card key={item.product_id} data={item} />
               ))}
            </div>
         </div>
      </>
   );
}
