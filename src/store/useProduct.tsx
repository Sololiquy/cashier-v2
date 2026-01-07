import { create } from "zustand";
import { supabaseClient } from "@/util/client";
import { getAllProduct, updateProduct } from "@/util/services";

type Product = any;

interface ProductState {
   products: Product[];
   loading: boolean;
   loaded: boolean;

   fetchProduct: () => Promise<void>;
   update: (productID: string, price: number, availability: boolean) => Promise<void>;

   setProducts: (products: Product[]) => void;
   setLoading: (value: boolean) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
   products: [],
   loading: false,
   loaded: false,

   fetchProduct: async () => {
      if (get().loaded) return;

      set({ loading: true });

      try {
         const data = await getAllProduct(supabaseClient);
         set({ products: data ?? [], loaded: true });
      } catch (err) {
         console.error(err);
      } finally {
         set({ loading: false });
      }
   },

   update: async (product_id, price, availability) => {
      await updateProduct(supabaseClient, product_id, price, availability);

      set((state) => ({
         products: state.products.map((item) =>
            item.product_id === product_id
               ? {
                    ...item,
                    price,
                    availability,
                    quantity: availability ? item.quantity : 0,
                 }
               : item
         ),
      }));
   },

   setProducts: (products) => set({ products }),
   setLoading: (value) => set({ loading: value }),
}));
