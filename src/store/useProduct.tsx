import { create } from "zustand";

type Product = any;

interface ProductState {
   products: Product[];
   setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductState>((set) => ({
   products: [],
   setProducts: (products) => set({ products }),
}));
