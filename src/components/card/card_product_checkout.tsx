import { useProductStore } from "@/store/useProduct";

type Parameter = {
   data: {
      product_id: string;
      quantity: number;
   };
};

export default function Card({ data }: Parameter) {
   const products = useProductStore((state) => state.products);

   const name = products.find((p) => p.product_id === data.product_id)?.name || "";
   const price = products.find((p) => p.product_id === data.product_id)?.price || 0;
   const imageURL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product/${
      products.find((p) => p.product_id === data.product_id)?.url_image || ""
   }`;

   return (
      <div className={`gap-3 flex flex-row`}>
         <div className={`checkout_tabImage aspect-square h-auto!`}>
            <img className={`w-full h-full object-cover`} src={imageURL} alt="" />
         </div>
         <div className={`checkout_tabInfo text-base`}>{name}</div>
         <div className={`checkout_tabQty text-base`}>{data.quantity}</div>
         <div className={`checkout_tabTotal  text-base`}>{price * data.quantity}</div>
      </div>
   );
}
