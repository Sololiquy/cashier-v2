import { Routes, Route } from "react-router";

import Layout from "./pages/_layout";
import Login from "./pages/login";
import Menu from "./pages/menu";
import Receipt from "./pages/receipt";
import Setting from "./pages/setting";

export default function App() {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Menu />} />
            <Route path="menu" element={<Menu />} />
            <Route path="receipt" element={<Receipt />} />
            <Route path="setting" element={<Setting />} />
         </Route>

         <Route path="/login" element={<Login />} />
      </Routes>
   );
}
