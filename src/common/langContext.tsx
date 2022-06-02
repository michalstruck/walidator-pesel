import { createContext } from "react";

export type langs = "enUS" | "plPL" | "frFR" | "esES";

const langContext = createContext<{
  language: string;
  changeLanguage: (newLang: langs) => void;
  currentTranslations: {
    Language: string;
    Check: string;
    Sex: string;
    DOB: string;
  };
}>({
  language: "enUS",
  changeLanguage: () => {},
  currentTranslations: {
    Language: "Język",
    Check: "Sprawdź",
    Sex: "Płeć",
    DOB: "Data urodzenia:",
  },
});

export default langContext;
