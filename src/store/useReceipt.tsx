import { create } from "zustand";
import { supabaseClient } from "@/util/client";
import { getAllReceipt } from "@/util/services";

interface ReceiptState {
   receipt: any[];
   loading: boolean;
   loaded: boolean;
   fetchReceipt: () => Promise<void>;
}

export const useReceiptStore = create<ReceiptState>((set, get) => ({
   receipt: [],
   loading: false,

   loaded: false,
   fetchReceipt: async () => {
      if (get().loaded) return;

      set({ loading: true });

      try {
         const data = await getAllReceipt(supabaseClient);
         set({ receipt: data ?? [], loaded: true });
      } catch (err) {
         console.error(err);
      } finally {
         set({ loading: false });
      }
   },
}));
