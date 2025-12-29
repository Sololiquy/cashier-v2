import { useEffect, useState } from "react";

export default function ThemeButton() {
   const [isDark, setIsDark] = useState(false);

   useEffect(() => {
      const saved = localStorage.getItem("theme");

      if (saved) {
         document.documentElement.classList.toggle("dark", saved === "dark");
         setIsDark(saved === "dark");
      } else {
         const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
         document.documentElement.classList.toggle("dark", prefersDark);
         setIsDark(prefersDark);
      }
   }, []);

   const toggleTheme = () => {
      const next = !isDark;
      setIsDark(next);

      if (next) {
         document.documentElement.classList.add("dark");
         localStorage.setItem("theme", "dark");
      } else {
         document.documentElement.classList.remove("dark");
         localStorage.setItem("theme", "light");
      }
   };

   return (
      <button onClick={toggleTheme} className={`px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition`}>
         {isDark ? "🌙 Dark" : "☀️ Light"}
      </button>
   );
}
