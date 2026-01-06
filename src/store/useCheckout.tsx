import { create } from "zustand";
import { useProductStore } from "./useProduct";

interface CheckoutItem {
   product_id: string;
   quantity: number;
}

interface CheckoutState {
   items: CheckoutItem[];
   add: (product_id: string) => void;
   remove: (product_id: string) => void;
   totalPrice: () => number;
   getQuantity: (product_id: string) => number;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
   items: [],

   add: (product_id) => {
      const items = get().items;
      const existing = items.find((i) => i.product_id === product_id);

      if (existing) {
         set({
            items: items.map((i) => (i.product_id === product_id ? { ...i, quantity: i.quantity + 1 } : i)),
         });
      } else {
         set({ items: [...items, { product_id, quantity: 1 }] });
      }
   },

   remove: (product_id) => {
      set({
         items: get()
            .items.map((i) => (i.product_id === product_id ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
      });
   },

   totalPrice: () => {
      const products = useProductStore.getState().products;

      return get().items.reduce((total, item) => {
         const product = products.find((p) => p.product_id === item.product_id);
         if (!product) return total;

         return total + product.price * item.quantity;
      }, 0);
   },

   getQuantity: (product_id) => get().items.find((i) => i.product_id === product_id)?.quantity ?? 0,
}));
