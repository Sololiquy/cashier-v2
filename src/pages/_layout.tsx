import { useEffect } from "react";
import { Link, Outlet } from "react-router";

import { useProductStore } from "@/store/useProduct";
import { getAllProduct } from "@/util/services";
import { supabaseClient } from "@/util/client";

import { IoHomeSharp, IoLogOut, IoSettings } from "react-icons/io5";
import { MdReceipt } from "react-icons/md";

import ThemeButton from "components/button/switchTheme";

export default function Layout() {
   const setProducts = useProductStore((state) => state.setProducts);

   useEffect(() => {
      getAllProduct(supabaseClient)
         .then((data) => {
            setProducts(data ?? []);
         })
         .catch((err) => {
            console.error("Failed to load products:", err);
         });
   }, [setProducts]);

   return (
      <div className={`allScreen  flex flex-row`}>
         {/* Sidebar */}
         <nav className={`w-20 gap-5 p-2 flex flex-col allCenter bg-black`}>
            <Link to="menu">
               <IoHomeSharp className={`text-5xl text-white`} aria-label="Home" />
            </Link>
            <Link to="receipt">
               <MdReceipt className={`text-5xl text-white`} />
            </Link>
            <Link to="setting">
               <IoSettings className={`text-5xl text-white`} />
            </Link>
            <ThemeButton />
            <hr className={`w-full my-4 text-white`} />
            <IoLogOut className={`text-5xl text-white`} />
         </nav>

         {/* Content */}
         <main className={`flex-1 p-2 text-4xl`}>
            <Outlet />
         </main>
      </div>
   );
}
