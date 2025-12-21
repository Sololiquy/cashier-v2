import { Outlet } from "react-router";
import { IoHomeSharp, IoLogOut, IoSettings } from "react-icons/io5";
import { MdReceipt } from "react-icons/md";

export default function Layout() {
   return (
      <div className={`allScreen flex flex-row`}>
         <div className={`w-20 gap-5 p-2 flex flex-col allCenter bg-black`}>
            <IoHomeSharp className={`text-5xl text-white`} />
            <MdReceipt className={`text-5xl text-white`} />
            <IoSettings className={`text-5xl text-white`} />
            <IoLogOut className={`text-5xl text-white`} />
         </div>
         <div className={`p-2 text-4xl`}>
            <Outlet />
         </div>
      </div>
   );
}
