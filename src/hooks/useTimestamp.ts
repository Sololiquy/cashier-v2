// Change format date from supabase
export function Timestamp(rawTimestamp: string) {
   const date = rawTimestamp.split("T")[0] || "";
   const time = rawTimestamp.split("T")[1].split(".")[0] || "";
   return { date, time };
}
