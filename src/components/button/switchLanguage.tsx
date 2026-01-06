import { useLanguageStore } from "@/store/useLanguage";

export default function SwitchLanguage() {
   const lang = useLanguageStore((s) => s.lang);
   const setLang = useLanguageStore((s) => s.setLang);

   const toggle = () => {
      setLang(lang === "en" ? "id" : "en");
   };

   return (
      <button onClick={toggle} className={`px-3 py-1 rounded font-bold text-xl bg-(--color3)`}>
         {lang.toUpperCase()}
      </button>
   );
}
