import { useEffect } from "react";

import { useProductStore } from "@/store/useProduct";

import Card from "components/card/card_product_setting";

export default function Setting() {
   const { fetchProduct } = useProductStore();
   const products = useProductStore((state) => state.products);
   const loading = useProductStore((state) => state.loading);
   const filteredProducts = products.sort((a: any, b: any) => a.name.localeCompare(b.name));

   useEffect(() => {
      fetchProduct();
   }, []);

   return (
      <section className={`flex gap-4 p-4`}>
         <div className={`flex gap-3 flex-col`}>
            <div className={`text-2xl`}>Product Management Setting</div>
            <div className={`gap-3 flex flex-row flex-wrap`}>
               {filteredProducts.map((item: any) => (
                  <Card key={item.product_id} data={item} />
               ))}
            </div>
         </div>
      </section>
   );
}
