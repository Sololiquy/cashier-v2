import { create } from "zustand";

import en from "@/locales/en.json";
import id from "@/locales/id.json";

export type Language = "en" | "id";

const dictionaries = { en, id };

interface LanguageState {
   lang: Language;
   text: typeof en;
   setLang: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
   lang: "en",
   text: en,

   setLang: (lang) =>
      set({
         lang,
         text: dictionaries[lang],
      }),
}));
