import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProduct";
import { useLanguageStore } from "@/store/useLanguage";
import { useCheckoutStore } from "@/store/useCheckout";

import { ImSpoonKnife } from "react-icons/im";
import { RiDrinks2Fill } from "react-icons/ri";
import { LuDessert } from "react-icons/lu";

import Card from "components/card/card_product";
import CheckoutCard from "components/card/card_product_checkout";

export default function Menu() {
   const { fetchProduct } = useProductStore();
   const text = useLanguageStore((state) => state.text);
   const products = useProductStore((state) => state.products);
   const loading = useProductStore((state) => state.loading);
   const checkout = useCheckoutStore((state) => state.items);
   const totalPrice = useCheckoutStore((state) => state.totalPrice());
   const [category, setCategory] = useState<string>("");

   useEffect(() => {
      fetchProduct();
   }, []);

   const filteredProducts = category ? products.filter((p) => p.category.includes(category)) : products;

   const categoryFilter = (value: string) => {
      setCategory((prev) => (prev === value ? "" : value));
   };

   if (loading) {
      return <div className={`flex justify-center items-center h-full text-xl`}>Loading products...</div>;
   }

   return (
      <section className={`flex gap-4 `}>
         <section className={`flex-1 p-4`}>
            {/* Filters */}
            <nav className={`flex pb-4 gap-2`}>
               <button
                  className={`buttonFilterProduct ${category === "food" ? "bg-(--color3)!  font-bold" : ""}`}
                  onClick={() => categoryFilter("food")}
               >
                  <span>
                     <ImSpoonKnife />
                  </span>
                  <span className={`grow`}>{text.menu.food}</span>
               </button>

               <button
                  className={`buttonFilterProduct ${category === "drink" ? "bg-(--color3)!  font-bold" : ""}`}
                  onClick={() => categoryFilter("drink")}
               >
                  <span>
                     <RiDrinks2Fill />
                  </span>
                  <span className={`grow`}>{text.menu.drink}</span>
               </button>

               <button
                  className={`buttonFilterProduct ${category === "dessert" ? "bg-(--color3)!  font-bold" : ""}`}
                  onClick={() => categoryFilter("dessert")}
               >
                  <span>
                     <LuDessert />
                  </span>
                  <span className={`grow`}>{text.menu.dessert}</span>
               </button>
            </nav>

            {/* Products */}
            <div className={`flex flex-wrap gap-3`}>
               {filteredProducts.length === 0 ? (
                  <div>No products loaded</div>
               ) : (
                  filteredProducts.map((data) => (
                     <div key={data.product_id}>
                        <Card data={data} />
                     </div>
                  ))
               )}
            </div>
         </section>

         {/* checkout list */}
         <aside className={`h-screen p-2 rounded flex flex-col bg-(--color2) `}>
            <div className="gap-2 flex flex-col grow">
               <div className={`gap-3 flex flex-row`}>
                  <div className={`checkout_tabImage h-auto!`}></div>
                  <div className={`checkout_tabInfo text-base`}>Info</div>
                  <div className={`checkout_tabQty text-base`}>Qty</div>
                  <div className={`checkout_tabTotal  text-base`}>Total</div>
               </div>
               {checkout.map((data) => (
                  <div key={data.product_id}>
                     <CheckoutCard data={data} />
                  </div>
               ))}
            </div>
            <hr className={`w-full my-2 text-white`} />
            <div className="my-2 flex justify-end text-3xl">Rp. {totalPrice}</div>
            <button
               disabled={checkout.length === 0}
               className={`px-4 py-2 text-white text-2xl rounded ${
                  checkout.length === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 active:bg-green-700"
               }`}
            >
               CHECKOUT
            </button>
         </aside>
      </section>
   );
}
