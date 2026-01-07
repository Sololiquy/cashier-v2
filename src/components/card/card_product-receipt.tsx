import { useProductStore } from "@/store/useProduct";

type Parameter = {
   data: {
      product_id: string;
      quantity: number;
      price: number;
   };
};

export default function Card({ data }: Parameter) {
   const products = useProductStore((state) => state.products);

   const name = products.find((p) => p.product_id === data.product_id)?.name || "";
   const imageURL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product/${
      products.find((p) => p.product_id === data.product_id)?.url_image || ""
   }`;

   return (
      <div className={`gap-2 flex flex-row text-base`}>
         <div className={`size-12`}>
            <img className={`w-full h-full object-cover`} src={imageURL} alt="" />
         </div>
         <div className={`flex flex-col grow`}>
            <div>{name}</div>
            <div>Rp {data.price}</div>
         </div>
         <div>x{data.quantity}</div>
      </div>
   );
}
