import { createContext } from "react";

export type langs = "en-US" | "pl-PL" | "fr-FR" | "es-ES";

export const languages = {
  english: "en-US",
  polish: "pl-PL",
  french: "fr-FR",
  spanish: "es-ES",
};

const langContext = createContext<{
  language: string;
  changeLanguage: (newLang: langs) => void;
}>({
  language: languages.english,
  changeLanguage: () => {},
});

export default langContext;
