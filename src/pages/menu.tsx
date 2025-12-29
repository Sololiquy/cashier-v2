import { useState } from "react";
import { useProductStore } from "@/store/useProduct";

import { ImSpoonKnife } from "react-icons/im";
import { RiDrinks2Fill } from "react-icons/ri";
import { LuDessert } from "react-icons/lu";

import Card from "components/card/card_product";

export default function Menu() {
   const products = useProductStore((state) => state.products);
   const [category, setCategory] = useState<string>("");

   const filteredProducts = category ? products.filter((p) => p.category.includes(category)) : products;

   const categoryFilter = (value: string) => {
      setCategory((prev) => (prev === value ? "" : value));
   };

   return (
      <div>
         {/* Filters */}
         <nav className={`flex pb-4 gap-2`} aria-label="Product category filter">
            <button className={`buttonFilterProduct ${category === "food" ? "!bg-(--color3)" : ""}`} onClick={() => categoryFilter("food")}>
               <span>
                  <ImSpoonKnife />
               </span>
               <span className={`grow`}>FOOD</span>
            </button>

            <button className={`buttonFilterProduct ${category === "drink" ? "!bg-(--color3)" : ""}`} onClick={() => categoryFilter("drink")}>
               <span>
                  <RiDrinks2Fill />
               </span>
               <span className={`grow`}>DRINK</span>
            </button>

            <button className={`buttonFilterProduct ${category === "dessert" ? "!bg-(--color3)" : ""}`} onClick={() => categoryFilter("dessert")}>
               <span>
                  <LuDessert />
               </span>
               <span className={`grow`}>DESSERT</span>
            </button>
         </nav>

         {/* Products */}
         <div className={`flex flex-wrap gap-3`}>
            {filteredProducts.length === 0 ? (
               <div>No products loaded</div>
            ) : (
               filteredProducts.map((p) => (
                  <div key={p.product_id}>
                     <Card data={p} />
                  </div>
               ))
            )}
         </div>
      </div>
   );
}
