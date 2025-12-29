import type { SupabaseClient } from "@supabase/supabase-js";

export async function getAllProduct(supabase: SupabaseClient) {
   const { data, error } = await supabase.rpc("getall_products");
   if (error) throw new Error(error.message);
   return data;
}

export async function getAllReceipt(supabase: SupabaseClient) {
   const { data, error } = await supabase.rpc("getall_receipt");
   if (error) {
      throw new Error(error.message);
   }
   return data;
}

export async function getProduct(supabase: SupabaseClient, productID: string) {
   const { data, error } = await supabase.rpc("get_product", {
      o_productid: productID,
   });
   if (error) {
      throw new Error(error.message);
   }
   return data;
}

export async function updateProduct(supabase: SupabaseClient, productID: string, price: number, availability: boolean) {
   const { error } = await supabase.rpc("update_product", {
      o_productid: productID,
      o_price: price,
      o_availability: availability,
   });
   if (error) {
      throw new Error(error.message);
   }
}

export async function addCheckout(supabase: SupabaseClient, checkout: any[], total: number) {
   const { error } = await supabase.rpc("add_checkout", {
      o_receipt_data: checkout,
      o_total: total,
   });
   if (error) {
      throw new Error(error.message);
   }
}

export async function paymentManual(supabase: SupabaseClient, checkout_date: string, payTotal: number) {
   const { error } = await supabase.rpc("payment_manual", {
      o_checkout_date: checkout_date,
      o_paytotal: payTotal,
   });
   if (error) {
      throw new Error(error.message);
   }

   return { success: true };
}
