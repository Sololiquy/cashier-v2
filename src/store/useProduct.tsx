import { create } from "zustand";

type Product = any;

interface ProductState {
   products: Product[];
   loading: boolean;

   setProducts: (products: Product[]) => void;
   setLoading: (value: boolean) => void;
}

export const useProductStore = create<ProductState>((set) => ({
   products: [],
   loading: false,

   setProducts: (products) => set({ products }),
   setLoading: (value) => set({ loading: value }),
}));
