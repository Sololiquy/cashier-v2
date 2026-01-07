import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./App";

ReactDOM.hydrateRoot(
   document.getElementById("root")!,
   <StrictMode>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </StrictMode>
);
